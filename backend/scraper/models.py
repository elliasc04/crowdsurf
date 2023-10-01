from django.db import models

class Scraper(models.Model):
    url = models.URLField(unique=True, default='None')
    livebusyness = models.TextField(blank=True, null=True)
    populartimes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"url:{self.url} \n livebusyness:{self.livebusyness} \n populartimes:{self.populartimes}"
