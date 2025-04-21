import { LightningElement, wire } from 'lwc';
import { MessageContext, publish } from 'lightning/messageService';
import SampleMessage from '@salesforce/messageChannel/SampleMessage__c'

export default class CompC extends LightningElement {


    @wire(MessageContext) msgContext;

    sendEvent(){
        console.log('about to send event from C');
        publish(this.msgContext, SampleMessage);
        console.log('event sent from C');
    }

}