from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Scraper
from .main import MapsPage
import json, traceback
from datetime import datetime
from django.http import HttpResponse
def scrape_data(url):
    """Get data by scraping Google Maps page and store it to the database."""
    maps_page = MapsPage(url)

    live_busyness_data = json.loads(maps_page.get_live_busyness())
    populartimes_data = json.loads(maps_page.get_popular_times())

    Scraper.objects.update_or_create(
        url=url,
        defaults={
            "livebusyness": live_busyness_data,
            "populartimes": populartimes_data,
        },
    )

    return live_busyness_data, populartimes_data


@csrf_exempt
def get_live_busyness(request, url):
    """Get and return live busyness data."""
    if request.method == "GET":
        try:
            live_busyness_data, _ = scrape_data(url)
            return JsonResponse(
                {
                    "success": "Live busyness data saved successfully",
                    "livebusyness": live_busyness_data,
                }
            )
        except Exception as e:
            error_traceback = traceback.format_exc()
            return JsonResponse({"error": str(e), "traceback": error_traceback,}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def get_popular_times(request, url):
    """Get and return popular times data."""
    if request.method == "GET":
        try:
            _, populartimes_data = scrape_data(url)
            return JsonResponse(
                {
                    "success": "Popular times data saved successfully",
                    "populartimes": populartimes_data,
                }
            )
        except Exception as e:
            error_traceback = traceback.format_exc()
            return JsonResponse({"error": str(e), "traceback": error_traceback,}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def get_full_info(request, url):
    if request.method == "GET":
        try:
            live_busyness_data, populartimes_data = scrape_data(url)
            return JsonResponse(
                {
                    "success": "Popular times data saved successfully",
                    "populartimes": populartimes_data,
                    "livebusyness": live_busyness_data,
                }
            )
        except Exception as e:
            error_traceback = traceback.format_exc()
            return JsonResponse({"error": str(e), "traceback": error_traceback,}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=400)