import { LightningElement, track } from 'lwc';

export default class CustomLWC extends LightningElement {


    @track person = { name: 'Sam', age: 30 };
    
    i = 0
    
    renderedCallback(){
        console.log("I got called!");
    }
    updateName() {
        this.i+=1
        this.person.name = 'Alex'+ this.i;
        console.log(this.person.name);
    }

}