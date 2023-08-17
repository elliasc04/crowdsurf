from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import re, json, urllib.parse
from datetime import datetime

chrome_options = Options()

# Set headless mode
chrome_options.add_argument("--headless")

# If you want to disable notifications (optional)
chrome_options.add_argument("--disable-notifications")


#finds the aria labels describing popular times on google maps page, only works for businesses
# that have their popular times enabled
def get_average_times(daydata, days):
    timedict = dict()
    i = 0
    for datapt in daydata:
        data = datapt.find_elements(By.CLASS_NAME,"dpoVLd ")
        totaldata = []
        for pt in data:
            
            totaldata.append(str(pt.get_attribute("aria-label")).replace("\u202f",""))
        timedict[days[i]] = totaldata
        i+=1
    return timedict


# gets the live busyness for the current time by checking through aria labels 
def get_live_busyness(elementdict, days, timeconvert):
    current_time = str(datetime.now().time())
    current_day = str(datetime.now().strftime("%A"))

    timeindex = int(re.search(r'(\d+):', current_time)[0][:-1])

    iscurrentlylive = True

    currentday = None
    currentelement = None
    prevtime = None
    
    for day in days:
        for element in elementdict.get(day):
            if "Current" in element:
                currentday = day
                return [currentday, element,prevtime, True]
            time_string = re.findall(r'\d+(?:AM|PM)', element)[0]
            prevtime = timeconvert[time_string]
    
    iscurrentlylive = False

    daydata = elementdict[current_day]
    for element in daydata:
        time_string = re.findall(r'\d+(?:AM|PM)', element)[0]
        matchtime = timeconvert[time_string]
        if matchtime == timeindex:
            return [current_day, element, timeindex - 1, iscurrentlylive]

class MapsPage:
    days = {'Sunday': 1,
                'Monday': 2,
                'Tuesday': 3,
                'Wednesday': 4,
                'Thursday': 5,
                'Friday': 6,
                'Saturday': 7}
    
    timeconvert = {
        '1AM': 1, '2AM': 2, '3AM': 3, '4AM': 4, '5AM': 5, '6AM': 6,
        '7AM': 7, '8AM': 8, '9AM': 9, '10AM': 10, '11AM': 11, '12PM': 12,
        '1PM': 13, '2PM': 14, '3PM': 15, '4PM': 16, '5PM': 17, '6PM': 18,
        '7PM': 19, '8PM': 20, '9PM': 21, '10PM': 22, '11PM': 23, '12AM': 24
    }

    timeconvert_reverse = {
        1: '1AM', 2: '2AM', 3: '3AM', 4: '4AM', 5: '5AM', 6: '6AM',
        7: '7AM', 8: '8AM', 9: '9AM', 10: '10AM', 11: '11AM', 12: '12PM',
        13: '1PM', 14: '2PM', 15: '3PM', 16: '4PM', 17: '5PM', 18: '6PM',
        19: '7PM', 20: '8PM', 21: '9PM', 22: '10PM', 23: '11PM', 24: '12AM'
    }
    def __init__(self, page_id):
        self.url = urllib.parse.unquote(page_id)
        driver = webdriver.Chrome(options=chrome_options)
        driver.get(self.url)


        self.get_average_times = get_average_times(driver.find_elements(By.CLASS_NAME,"g2BVhd"),list(self.days.keys()))
        self.live_busyness = get_live_busyness(self.get_average_times, self.days, self.timeconvert)
        self.iscurrentlylive = True

    def get_by_day(self, day):
            return self.get_average_times[day]


    def retlivebusyness(self):
        # return in order:
        # [0] == Day
        # [1] == Time(24h)
        # [2] == Live Busyness
        # [3] == Usual Busyness
        live_busyness = self.live_busyness
        day = live_busyness[0]

        

        busyness = live_busyness[1]

        
        percentages = re.findall(r'\d+%', busyness)
        live = percentages[0][:-1]

        prevtime = live_busyness[2]
        current_time = prevtime + 1

        livestring = f'On {day} at {self.timeconvert_reverse[current_time]}, it is currently {live}% busy.'

        if not live_busyness[3]:
            self.iscurrentlylive = False
            return json.dumps([day, current_time, live, live, livestring])
        
        usual = percentages[1][:-1]


        return json.dumps([day, current_time, live, usual, livestring])
    
    def retpopulartimes(self):
        
        timedict = self.get_average_times
        retlist = []

        # finds all data for the current time and day.
        livetime = json.loads(self.retlivebusyness())
        if self.iscurrentlylive:
            # sets dayindex to the day as a string, such as "Sunday"
            dayindex = livetime[0]

            # sets timeindex to the current time on a 24h clock
            timeindex = int(livetime[1])

            # finds the earliest time available on the current day, whi
            earliesttime = int(timedict[dayindex][0][-4:-1][:-2])
            
            # finds the difference between timeindex and earliesttime, which will be the index number
            # of the current time in timedict, the time dictionary.
            timediff = timeindex - earliesttime

            current_time = self.timeconvert_reverse[timeindex]

            #finds the currenttime using the calculated indices from the past few lines.
            timedict[dayindex][timediff] = f'{livetime[3]}% busy at {current_time}'

        converted_data = []

        for key in timedict.keys():
            timedata = timedict[key]
            for time in timedata:
                percentage = int(re.findall(r'\d+%', time)[0][:-1])  # Extract and convert the percentage
                time_string = re.findall(r'\d+(?:AM|PM)', time)[0]  # Extract the time string
                numeric_time = self.timeconvert[time_string]  # Convert time string to numeric value

                converted_data.append([percentage, numeric_time])
            retlist.append(converted_data)
            converted_data = []
        jsonlist = json.dumps(retlist)
        return jsonlist 
        


        

# anytime_url = "https://www.google.com/maps/place/Anytime+Fitness/@38.859691,-94.7507246,12z/data=!4m6!3m5!1s0x87c0c1a24b58163b:0x518415eefd7cb2c!8m2!3d38.859691!4d-94.6683271!16s%2Fg%2F11c6q33cnq?entry=ttu"
# firstwatch_url = "https://www.google.com/maps/place/First+Watch/@38.8540006,-94.6731214,17z/data=!3m1!4b1!4m6!3m5!1s0x87c0c1a0c9eebe41:0x2ab4ae8a7170762a!8m2!3d38.8540006!4d-94.6705465!16s%2Fg%2F1hm68nzx0?entry=ttu"
# henry_crown = "https://www.google.com/maps/place/Henry+Crown+Sports+Pavilion/@42.0591628,-87.6737731,18.46z/data=!4m14!1m7!3m6!1s0x880fc5480b0d0d21:0x8fb2ee5a17f66e80!2sCrossfit+Wilmette!8m2!3d42.0740365!4d-87.7073127!16s%2Fg%2F11yr3v0sl!3m5!1s0x880fd00b703e4c39:0x509c3569d8eb2a8e!8m2!3d42.0596373!4d-87.6729806!16s%2Fg%2F1hf3_crv1?entry=ttu"

# anytimedata = MapsPage(anytime_url)
# print(anytimedata.retlivebusyness())
# print(anytimedata.retpopulartimes())

# firstwatchdata = MapsPage(firstwatch_url)
# print(firstwatchdata.retlivebusyness())
# print(firstwatchdata.retpopulartimes())
# print(anytimedata.retpopulartimes()) 