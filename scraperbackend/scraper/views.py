from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Scraper
from .main import MapsPage  # Import your scraping logic
import json

def scrape_data(url):
    maps_page = MapsPage(url)

    live_busyness_json = maps_page.retlivebusyness()
    populartimes_json = maps_page.retpopulartimes()

    live_busyness_data = json.loads(live_busyness_json)
    populartimes_data = json.loads(populartimes_json)

    scraper, created = Scraper.objects.update_or_create(
        url=url,
        defaults={'livebusyness': live_busyness_data, 'populartimes': populartimes_data}
    )

    return live_busyness_data, populartimes_data

@csrf_exempt
def get_live_busyness(request, url):
    if request.method == 'GET':
        try:
            live_busyness_data, _ = scrape_data(url)
            return JsonResponse({'success': 'Live busyness data saved successfully', 'livebusyness': live_busyness_data})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def get_popular_times(request, url):
    if request.method == 'GET':
        try:
            _, populartimes_data = scrape_data(url)
            return JsonResponse({'success': 'Popular times data saved successfully', 'populartimes': populartimes_data})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
