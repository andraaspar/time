/// <reference path='StorageType.ts'/>

module berek {
	export class StorageWrapper {
	
		private storage: Storage;
	
		constructor(private type: StorageType) {
			this.storage = this.getNativeStorage(type);
		}
		
		static isStorageSupported(type: StorageType): boolean {
			var result = false;
			var storageWrapper = new StorageWrapper(type);
			try {
				var itemName = 'berek_StorageUtil_test';
				var value = '1';
				storageWrapper.setItem(itemName, value);
				result = storageWrapper.getItem(itemName) === value;
				storageWrapper.removeItem(itemName);
			} catch (e) {
				result = false;
			}
			return result;
		}
		
		getNativeStorage(type: StorageType): Storage {
			var result: Storage;
			try {
				switch (type) {
					case StorageType.LOCAL:
						result = window.localStorage;
						break;
					case StorageType.SESSION:
						result = window.sessionStorage;
						break;
				}
			} catch (e) {}
			return result;
		}
		
		getKey(i: number): string {
			var result: string;
			if (this.storage) {
				result = this.storage.key(i);
			}
			return result;
		}
		
		getItem(k: string): string {
			var result: string;
			if (this.storage) {
				result = this.storage.getItem(k);
			}
			return result;
		}
		
		setItem(k: string, v: string): boolean {
			var success = false;
			if (this.storage) {
				try {
					this.storage.setItem(k, v);
					success = true;
				} catch (e) {}
			}
			return success;
		}
		
		removeItem(k: string): void {
			if (this.storage) {
				this.storage.removeItem(k);
			}
		}
		
		clear(type: StorageType): void {
			if (this.storage) {
				this.storage.clear();
			}
		}
		
		getType() { return this.type }
		getStorage() { return this.storage }
	}
}