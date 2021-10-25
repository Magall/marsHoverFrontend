import HoverService from "./hoverService";

export default class Services{
    hover:HoverService
    constructor(){
        this.hover = new HoverService();
    }
}