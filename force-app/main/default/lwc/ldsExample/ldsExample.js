import { LightningElement, wire, api } from 'lwc';
import { getRecord, createRecord, updateRecord, deleteRecord } from 'lightning/uiRecordApi';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { refreshApex } from '@salesforce/apex';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class AccountViewer extends LightningElement {
    @api recordId;

    // Wire account data
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [NAME_FIELD, PHONE_FIELD]
    }) account;

    data = [];
    error;
    wiredRelatedListResult;

    contactFields = [
        { label: 'Contact Id', fieldName: 'Id', type: 'text' },
        { label: 'Contact Name', fieldName: 'Name', type: 'text' }
    ];

    // Wire related list of contacts
    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Contacts',
        fields: ['Contact.Id', 'Contact.Name']
    })
    wiredContacts(result) {
        this.wiredRelatedListResult = result;
        const { data, error } = result;

        if (data) {
            this.data = data.records.map(rec => ({
                Id: rec.fields.Id.value,
                Name: rec.fields.Name.value
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    // Computed fields
    get name() {
        return this.account.data ? this.account.data.fields.Name.value : '';
    }

    get phone() {
        return this.account.data ? this.account.data.fields.Phone.value : '';
    }

    get debugData() {
        return this.data ? JSON.stringify(this.data, null, 2) : 'No data';
    }

    // Create new account
    createAccount() {
        const input = this.template.querySelector('[data-id="account_name"]');
        if (!input) {
            console.error('Account name input field not found!');
            return;
        }

        const fields = { Name: input.value };
        const recordInput = { apiName: 'Account', fields };

        createRecord(recordInput)
            .then(record => {
                console.log('Created record ID:', record.id);
            })
            .catch(error => {
                console.error('Error creating record:', error);
            });
    }

    // Update account name
    updateAccountName() {
        const input = this.template.querySelector('[data-id="account_name"]');
        if (!input) {
            console.error('Account name input field not found!');
            return;
        }

        const fields = {
            Id: this.recordId,
            Name: input.value
        };

        const recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                console.log('🎉 Hooray! Record updated');
            })
            .catch(error => {
                console.error('💥 Update failed:', error.body.message);
            });
    }

    // Delete account
    deleteAccount() {
        deleteRecord(this.recordId)
            .then(() => {
                console.log('🎉 Hooray! Record deleted');
            })
            .catch(error => {
                console.error('💥 Delete failed:', error.body.message);
            });
    }

    // Refresh related contacts
    refreshContacts() {
        refreshApex(this.wiredRelatedListResult)
            .then(() => {
                console.log('🔄 Contacts refreshed');
            })
            .catch(error => {
                console.error('Error refreshing contacts:', error);
            });
    }
}