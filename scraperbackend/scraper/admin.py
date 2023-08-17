import json
from django.contrib import admin
from .models import Scraper
from .main import MapsPage  # Import your scraping logic

class ScraperAdmin(admin.ModelAdmin):
    actions = ['scrape_selected_urls']
    list_display = ('url', 'livebusyness', 'populartimes')

    def scrape_selected_urls(self, request, queryset):
        for scraper in queryset:
            url = scraper.url
            try:
                maps_page = MapsPage(url)
                live_busyness_json = maps_page.retlivebusyness()
                populartimes_json = maps_page.retpopulartimes()

                # Parse JSON data into Python dictionaries or lists
                live_busyness = json.loads(live_busyness_json)
                populartimes = json.loads(populartimes_json)

                # Update the Scraper model with the scraped data
                scraper.livebusyness = live_busyness
                scraper.populartimes = populartimes
                scraper.save()

                self.message_user(request, f'Scraped URL: {url}')
            except Exception as e:
                self.message_user(request, f'Error scraping URL: {url}. Error: {str(e)}')

    scrape_selected_urls.short_description = 'Scrape selected URLs'

admin.site.register(Scraper, ScraperAdmin)


