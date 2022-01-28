# -*- coding: utf-8 -*-
import datetime
from typing import Optional

logfile = 'app.log'


def log(msg: str, data: any = '') -> None:
    now = datetime.datetime.utcnow()
    t = now.strftime("%d.%m.%Y %H:%M:%S")
    message = '[' + t + '] ' + msg + ' ' + str(data)
    with open(logfile, 'a+') as write_file:
        write_file.write(message + '\n')
    print(message)


def format_date_user(date: str) -> Optional[str]:
    """
    Formats a date string to format 01.03.2020.
    Mainly used for sending the recipe or other communication.
    """
    d = datetime.datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
    return d.strftime('%d.%m.%Y')
