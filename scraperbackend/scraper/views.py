from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Scraper
from .main import MapsPage  # Import your scraping logic
import json

@csrf_exempt
def scrape_data(request, url):
    if request.method == 'GET':
        try:
            maps_page = MapsPage(url)
            
            # Call the methods to get JSON data
            live_busyness_json = maps_page.retlivebusyness()
            populartimes_json = maps_page.retpopulartimes()

            # Parse JSON data into Python dictionaries or lists
            live_busyness_data = json.loads(live_busyness_json)
            populartimes_data = json.loads(populartimes_json)

            # Create or update the Scraper instance
            scraper, created = Scraper.objects.update_or_create(
                url=url,
                defaults={'livebusyness': live_busyness_data, 'populartimes': populartimes_data}
            )

            # Save the instance to the database
            scraper.save()

            # Return a success response
            return JsonResponse({'success': 'Data saved successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
