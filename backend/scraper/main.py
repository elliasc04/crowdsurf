from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import re, json, urllib.parse
from datetime import datetime


class MapsPage:
    DAYS = {
        "Sunday": 1,
        "Monday": 2,
        "Tuesday": 3,
        "Wednesday": 4,
        "Thursday": 5,
        "Friday": 6,
        "Saturday": 7,
    }

    TIME_CONVERT = {
        "1AM": 1,
        "2AM": 2,
        "3AM": 3,
        "4AM": 4,
        "5AM": 5,
        "6AM": 6,
        "7AM": 7,
        "8AM": 8,
        "9AM": 9,
        "10AM": 10,
        "11AM": 11,
        "12PM": 12,
        "1PM": 13,
        "2PM": 14,
        "3PM": 15,
        "4PM": 16,
        "5PM": 17,
        "6PM": 18,
        "7PM": 19,
        "8PM": 20,
        "9PM": 21,
        "10PM": 22,
        "11PM": 23,
        "12AM": 24,
    }

    REVERSE_TIME_CONVERT = {
    1: "1AM",
    2: "2AM",
    3: "3AM",
    4: "4AM",
    5: "5AM",
    6: "6AM",
    7: "7AM",
    8: "8AM",
    9: "9AM",
    10: "10AM",
    11: "11AM",
    12: "12PM",
    13: "1PM",
    14: "2PM",
    15: "3PM",
    16: "4PM",
    17: "5PM",
    18: "6PM",
    19: "7PM",
    20: "8PM",
    21: "9PM",
    22: "10PM",
    23: "11PM",
    24: "12AM",
    }


    def __init__(self, page_id):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-notifications")

        self.url = urllib.parse.unquote(page_id)
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.get(self.url)

        self.has_live_data = True
        self.average_times = self._get_average_times()
        if self.average_times:
            self.live_busyness = self._get_live_busyness()
        else:
            self.has_live_data = False
        self.is_currently_live = True

    def _get_average_times(self):
        data_points = self.driver.find_elements(By.CLASS_NAME, "g2BVhd")
        return self._parse_average_times(data_points, list(self.DAYS.keys()))

    def _parse_average_times(self, day_data, days):
        time_dict = {}
        for i, data_pt in enumerate(day_data):
            data = data_pt.find_elements(By.CLASS_NAME, "dpoVLd ")
            time_data = [
                str(pt.get_attribute("aria-label")).replace("\u202f", "") for pt in data
            ]
            time_dict[days[i]] = time_data
        return time_dict

    def _get_live_busyness(self):
        return self._parse_live_busyness(self.average_times, self.DAYS)

    def _parse_live_busyness(self, element_dict, days):
        current_time = str(datetime.now().time())
        current_day = str(datetime.now().strftime("%A"))
        time_index = int(re.search(r"(\d+):", current_time)[0][:-1])

        for day in days:
            for element in element_dict.get(day):
                if "Current" in element:
                    return [day, element, time_index, True]

        day_data = element_dict[current_day]
        for element in day_data:
            time_string = re.findall(r"\d+(?:AM|PM)", element)[0]
            match_time = self.TIME_CONVERT[time_string]
            if match_time == time_index:
                return [current_day, element, time_index - 1, False]

    def get_by_day(self, day):
        return self.average_times[day]

    def get_live_busyness(self):
        if not self.has_live_data:
            return json.dumps("No Live Data")

        day, busyness, current_time, is_currently_live = self.live_busyness

        live_percentage = int(re.findall(r"\d+%", busyness)[0][:-1])
        live_string = (
            f"On {day} at {current_time}, it is currently {live_percentage}% busy."
        )

        if not is_currently_live:
            return json.dumps([day, current_time, live_percentage, live_string])

        usual_percentage = int(re.findall(r"\d+%", busyness)[1][:-1])
        return json.dumps(
            [day, current_time, live_percentage, usual_percentage, live_string]
        )

    def get_popular_times(self):
        if not self.has_live_data:
            return json.dumps("No Busyness Data")

        time_dict = self.average_times
        ret_list = []

        # finds all data for the current time and day.
        live_time = json.loads(self.get_live_busyness())
        if self.is_currently_live:
            # sets day_index to the day as a string, such as "Sunday"
            day_index = live_time[0]
            # sets time_index to the current time on a 24h clock
            time_index = int(live_time[1])
            # finds the earliest time available on the current day
            earliest_time = int(time_dict[day_index][0][-4:-1][:-2])
            # finds the difference between time_index and earliest_time
            time_diff = time_index - earliest_time
            current_time = self.REVERSE_TIME_CONVERT[time_index]
            time_dict[day_index][time_diff] = f"{live_time[3]}% busy at {current_time}"

        converted_data = []

        for key in time_dict.keys():
            time_data = time_dict[key]
            for time in time_data:
                percentage = int(re.findall(r"\d+%", time)[0][:-1])
                time_string = re.findall(r"\d+(?:AM|PM)", time)[0]
                numeric_time = self.TIME_CONVERT[time_string]
                converted_data.append([percentage, numeric_time])
            ret_list.append(converted_data)
            converted_data = []
        return json.dumps(ret_list)


# anytime_url = "https://www.google.com/maps/place/Anytime+Fitness/@38.859691,-94.7507246,12z/data=!4m6!3m5!1s0x87c0c1a24b58163b:0x518415eefd7cb2c!8m2!3d38.859691!4d-94.6683271!16s%2Fg%2F11c6q33cnq?entry=ttu"
# firstwatch_url = "https://www.google.com/maps/place/First+Watch/@38.8540006,-94.6731214,17z/data=!3m1!4b1!4m6!3m5!1s0x87c0c1a0c9eebe41:0x2ab4ae8a7170762a!8m2!3d38.8540006!4d-94.6705465!16s%2Fg%2F1hm68nzx0?entry=ttu"
# henry_crown = "https://www.google.com/maps/place/Henry+Crown+Sports+Pavilion/@42.0591628,-87.6737731,18.46z/data=!4m14!1m7!3m6!1s0x880fc5480b0d0d21:0x8fb2ee5a17f66e80!2sCrossfit+Wilmette!8m2!3d42.0740365!4d-87.7073127!16s%2Fg%2F11yr3v0sl!3m5!1s0x880fd00b703e4c39:0x509c3569d8eb2a8e!8m2!3d42.0596373!4d-87.6729806!16s%2Fg%2F1hf3_crv1?entry=ttu"

# anytimedata = MapsPage(anytime_url)
# print(anytimedata.get_live_busyness())
# print(anytimedata.get_pop ular_times())

# firstwatchdata = MapsPage(firstwatch_url)
# print(firstwatchdata.retlivebusyness())
# print(firstwatchdata.retpopulartimes())
# print(anytimedata.retpopulartimes())
