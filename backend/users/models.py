from django.db import models

from django.contrib.auth.models import User


class Assessment(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    q1 = models.IntegerField(default=1)
    q2 = models.IntegerField(default=1)
    q3 = models.IntegerField(default=1)
    q4 = models.IntegerField(default=1)
    q5 = models.IntegerField(default=1)

    q6 = models.IntegerField(default=1)
    q7 = models.IntegerField(default=1)
    q8 = models.IntegerField(default=1)
    q9 = models.IntegerField(default=1)
    q10 = models.IntegerField(default=1)

    total_score = models.IntegerField()

    addiction_level = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return self.user.username
        return self.user.username