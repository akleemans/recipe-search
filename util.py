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


