import { Subscription } from 'rxjs';

export class SubscriptionManager {
	private subscriptions: Subscription[] = [];

	set add(subscription: Subscription) {
		this.subscriptions.push(subscription);
	}

	dispose(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}
}