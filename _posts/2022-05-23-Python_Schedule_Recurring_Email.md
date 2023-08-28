---
layout: post
title: "Python Schedule Routine Tasks Everyday"
date: 2022-05-23
tags: [Programming, Python, Linux]
---

## Brief ##
Everyday routine is something that the user will always do, including workdays and weekends, at certain fixed time. For example, exercising or brisk walking at 7:00 AM and opening mail to check Emails at 10:00 AM are all everyday routines. Manual and repetitive notification could be tedious in some scenarios. Therefore, we could run computer program to automate tasks to run periodically at a fixed time or date.

In this post, I would like to briefly discuss about how to start using Cron - the most popular Linux workload automation tool that is widely used in Linux community, and also how to use Python [smtplib][smtp],  [email.mime][email], [sched][sched], [time][time], and [datetime][datetime] for scheduling daily email routines.

## What is Cron ##

The cron utility is a Linux job scheduler that wakes up every minute, examining all stored crontabs, checking each command to see if it should be run in the current minute. So it can be used to setup tasks to run periodically.

### Cron Job Syntax ###

The Cron task syntax consists of 6 arguments separated by spaces. First 5 arguments describe the execution time, minute, hour, day, month, day of week. The last argument executes the program or command.

```
# MIN HOUR DAY MONTH DAYOFWEEK | COMMAND
# --------------------------------------
```

The execution time allowed values are these:

|  Field      |   Allowed values       |
| ------------- |-------------  |
|    minute    |    0-59          |
|    hour    |    0-23          |
|    day    |     1-31          |
|    month    |    1-12 (or names: JAN - DEX)          |
|    day of week    |    0-6 (or names: SUN - SAT)         |

### Setup Cron Job ###

If creating crontab in Linux job scheduler, user can set specific commands or shell scripts in the crontab file. The command with an option -e used for crontab instantiation:

```
crontab -e
```

The following example illustrates crontab scheduling:
<details markdown=block>
<summary markdown=span>*crontab*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">$ crontab -l
# MIN HOUR DAY MONTH DAYOFWEEK | COMMAND
# --------------------------------------
MAILTO=shirong0419@icloud.com
0 0 1 * * date && /Users/shi-rongliu/shell/LanguageTool.sh</span></code></pre></div></details>

Now, you have briefly understanding of how to use Cron to schedule on the Linux systems

## Python Implementation ##

### Sending Email and Image using SMTP Implementation ###

In the following implementation, **textme** and **textmeimage** functionns handle sending e-mail/MIME message objects and routing e-mail between mail servers.

<details markdown=block>
<summary markdown=span>*textmewhenitsdone.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

GMAIL = "gmail.com"
Message = """Subject: Program Confirmation
To: {recipient}
From: {sender}
Hey, Thanks for your waiting! Your program is done. We are processing it now and will contact you soon
Regards
Shi-rong (Louis) Liu
http://louiscode00.com/
"""

class TextMeWhenItsDone(object):
    """
    A :class:~practice_common_algorithm.tool.TextMeWhenItsDone object is the sending an email module
    The smtplib module defines an SMTP client session object that can be used to send mail to any internet machine with an SMTP or ESMTP listener daemon.
    """
    def __init__(self, email: str):
        if email[email.index("@")+1:] == GMAIL:
            self.server = smtplib.SMTP("smtp.gmail.com", 587)
    def __del__(self):
        self.server.quit()
    def login(self, email, password):
        """docstring for login"""
        self.server.starttls()
        self.server.login(email, password)
    def textme(self, email, password, receiver="YO"):
        """ Simple Mail Transfer Protocal is an application layer protocol in the OSI model.
        :param email:  The address sending this email
        :type  email:  string
        :param password:  The password for the authentication
        :type  password:  string
        :param receiver:  A list of addresses to send this mail to
        :type  receiver:  string
        :return:  Description
        :rtype:  Type
        """
        self.server.sendmail(email, receiver, Message.format(recipient=receiver, sender=email))
    def textmeimage(self, email: str, password: str, receiver="YO"):
        """docstring for TextMeImage"""
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Sharing Image"
        msg['From'] = email
        msg['To'] = receiver
        text = MIMEText('&lt;img src="cid:image1"&gt;', 'html')
        msg.attach(text)
        image1 = MIMEImage(open('xxxx.jpeg', 'rb').read())
        # Define the image's ID as referenced in the HTML body above
        image1.add_header('Content-ID', '&lt;image1&gt;')
        msg.attach(image1)
        self.server.sendmail(email, receiver, msg.as_string())
</span></code></pre></div></details>

### Scheduler Python Implementation ###

In the following implementation, one major functions, **send_email_at_fixed_time_everyday** executes sending email action at specified time everyday.

<details markdown=block>
<summary markdown=span>*scheduler_textmewhenitsdone.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">from textmewhenitsdone import TextMeWhenItsDone
from typing import List, NamedTuple
import sched
import time
import datetime
import random

class ScheduledTime(NamedTuple):
    """description"""
    hour: int
    minute: int
    second: int

class AuthenticationServer(NamedTuple):
    """description"""
    email: str
    password: str
    receiver: str

def prompt(prompt: str) -> str:
    """docsring for prompt"""
    return input(prompt).strip()

def textme(authentication) -> None:
    textmewhenitsdone = TextMeWhenItsDone(authentication.email)
    textmewhenitsdone.login(authentication.email, authentication.password)
    textmewhenitsdone.textme(authentication.email, authentication.password, authentication.receiver)
    print(f"Sending Email at {datetime.datetime.now()}")

def send_email_at_fixed_time_everyday(authentication: AuthenticationServer, scheduled_times: List[ScheduledTime]) -> None:
    """docstring for send_email_at_fixed_time_everyday"""
    """ Schedule to send email at fixed time everyday
    :param authentication:  Required authentication
    :type  authentication:  AuthenticationServer
    :param schedule_times:  scheduled time to run everyday
    :type  schedule_times:  List[ScheduledTime]
    """
    scheduler = sched.scheduler(time.time, time.sleep)
    def create_scheduled_date_times(
            year: int, month: int, day: int,
            scheduled_times: List[ScheduledTime]) -> List[datetime.datetime]:
        """docstring for create_scheduled_date_times"""
        """ Create scheduld date times
        :param year:  year
        :type  year:  int
        :param month:  month
        :type  month:  int
        :param day:  day
        :type  day:  int
        :param schedule_times:  scheduled time everyday
        :type  schedule_times:  Type
        :return: scheduled date time
        :rtype:  List[datetime.datetime]
        """
        scheduled_date_times = []
        for scheduled_time in scheduled_times:
            date_time = datetime.datetime(
                year=year,
                month=month,
                day=day,
                hour=scheduled_time.hour,
                minute=scheduled_time.minute,
                second=scheduled_time.second,
                microsecond=0
            )
            scheduled_date_times.append(date_time)
        return scheduled_date_times
    now_date_time = datetime.datetime.now()
    scheduled_date_times = create_scheduled_date_times(
            year=now_date_time.year,
            month=now_date_time.month,
            day=now_date_time.day,
            scheduled_times=scheduled_times)
    while True:
        for schedule_date_time in scheduled_date_times:
            if schedule_date_time > datetime.datetime.now():
                t = time.mktime(schedule_date_time.timetuple())
                scheduler.enterabs(time=t,
                                   priority=1,
                                   action=textme,
                                   argument=(),
                                   kwargs={"authentication": authentication})
                print(f"Scheduled action at run at {schedule_date_time}")
        scheduler.run()
        print(f"Scheduled action completed.")
        tomorrow_scheduled_date_times = [
                create_date_time_after_n_hour(date_time=schedule_date_time, n=24)
                for schedule_date_time in scheduled_date_times
        ]
        scheduled_date_times = tomorrow_scheduled_date_times

if __name__ == '__main__':
    authentication = AuthenticationServer(email=prompt("Form: "),
                                          password=prompt("Password: ").split()[0],
                                          receiver=prompt("To: ").split()[0])
    now_date_time = datetime.datetime.now()
    planned_date_time = now_date_time + datetime.timedelta(minutes=1)
    schedule_time_1 = ScheduledTime(hour=planned_date_time.hour,
                                    minute=planned_date_time.minute,
                                    second=0)
    schedule_time_2 = ScheduledTime(hour=planned_date_time.hour,
                                    minute=planned_date_time.minute,
                                    second=10)
    schedule_time_3 = ScheduledTime(hour=planned_date_time.hour,
                                    minute=planned_date_time.minute,
                                    second=20)
    scheduled_times = [schedule_time_1, schedule_time_2, schedule_time_3]

    send_email_at_fixed_time_everyday(authentication=authentication, scheduled_times=scheduled_times)</span></code></pre></div></details>

Here is the statement of scheduler program:
```
$ python3 scheduler.py
Form: xxxxxx@gmail.com
Password: *********
To: xxxxxx@hotmail.com
Scheduled action at run at 2022-05-24 14:03:00
Scheduled action at run at 2022-05-24 14:03:10
Scheduled action at run at 2022-05-24 14:03:20
Sending Email at 2022-05-24 14:03:03.030710
Sending Email at 2022-05-24 14:03:12.654331
Sending Email at 2022-05-24 14:03:22.791997
Scheduled action completed.
Scheduled action at run at 2022-05-25 14:03:00
Scheduled action at run at 2022-05-25 14:03:10
Scheduled action at run at 2022-05-25 14:03:20
```

Now, as you can see, the scheduler approach is executed as expected.

## Reference ##
+ [CronHowto](https://help.ubuntu.com/community/CronHowto)
+ [Wiki: MIME](https://en.wikipedia.org/wiki/MIME)
+ [Python Everyday Routine Scheduler](https://leimao.github.io/blog/Python-Everyday-Routine-Scheduler/)

[smtp]:https://docs.python.org/3/library/smtplib.html?highlight=smtp "https://docs.python.org/3/library/smtplib.html?highlight=smtp"

[email]:https://docs.python.org/3/library/email.mime.html#module-email.mime "https://docs.python.org/3/library/email.mime.html#module-email.mime"

[sched]:https://docs.python.org/3/library/sched.html?highlight=sched#module-sched "https://docs.python.org/3/library/sched.html?highlight=sched#module-sched"

[time]:https://docs.python.org/3/library/time.html?highlight=time#module-time "https://docs.python.org/3/library/time.html?highlight=time#module-time"

[datetime]:https://docs.python.org/3/library/datetime.html?highlight=datetime#module-datetime "https://docs.python.org/3/library/datetime.html?highlight=datetime#module-datetime"

<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
