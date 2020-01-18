Задания по теме «Боты»
<https://kodaktor.ru/g/bots>


Код bot.js:
```JavaScript
     // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            let result = `Вы сказали:  '${ context.activity.text }'`;
            if (context.activity.text === 'Привет') {
                result = 'Добрейший вечерочек!';
            }  else if (context.activity.text.startsWith('У меня экзамен завтра')) {
                result = 'Тогда желаю удачи!';
            }
            await context.sendActivity(result);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Добро пожаловать в чат!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
```

Ссылка на форк: <https://kodaktor.ru/7b1a1b3>

Результат: 
![Test](https://github.com/AllerGyn/WebSolutionsLabs2/blob/master/Images/Mynode_bot_test.JPG)
![Kodaktor](https://github.com/AllerGyn/WebSolutionsLabs2/blob/master/Images/Mynode_bot_kodaktor.JPG)
