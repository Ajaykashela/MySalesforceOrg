import { api, LightningElement, wire } from 'lwc';
import { MessageContext, subscribe } from 'lightning/messageService';
import SampleMessage from '@salesforce/messageChannel/SampleMessage__c'

export default class CompB extends LightningElement {


    @wire(MessageContext) MessageContext;

    @api
    compAexposedName = 'default from B'

    subscribed = null

    connectedCallback(){
        if(!this.subscribed){
            this.subscribed = subscribe(this.MessageContext, SampleMessage, (message)=>{
                console.log('Message recieved in B');
            });
        }
    }

    @api
    calledFromParent() {
        console.log('called from parent')
    }

    sendMessageToParent(){
        console.log('message to be sent');
        //env = new CustomEvent('messagetoparent');
        this.dispatchEvent( new CustomEvent('messagetoparent') );
        console.log('message sent');
    }

}