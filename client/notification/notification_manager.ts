/**
 * Copyright (c) 2017 The Absolute Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference path="../../references.ts" />

declare var self: ServiceWorkerGlobalScope;

declare var navigator: any;

export default class NotificationManager {
    private notification: Notification;

    constructor() { }

    async showNotification(title: string, options: object): Promise<boolean> {
        if (!navigator.serviceWorker) {
            return false;
        }

        this.notification = new Notification(title, options);

        self.registration.showNotification(title, options);
        return false;
    }

    async processClickEvent(event: Event, url: string): Promise<boolean> {
        if (!navigator.serviceWorker) {
            return false;
        }
        console.log('[Service Worker] Notification click Received.');

        var init = { notification: this.notification };
        var myNotificationEvent = new NotificationEvent(event.type, init);

        myNotificationEvent.notification.close();

        myNotificationEvent.waitUntil(
            self.clients.openWindow(url)
        );
        return false;
    }
}