import { LightningElement } from 'lwc';

export default class CompA extends LightningElement {

    calledFromParent(){
        console.log('request about to be sent from parent')
        this.refs.compb.calledFromParent();
    }
    handleparent(){
        console.log("method got called from child to parent")
    }
}