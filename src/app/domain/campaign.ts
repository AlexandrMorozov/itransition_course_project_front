import { Topic } from "./topic";
import { Tag } from "./tag";
import { Bonus } from './bonus';
import { User } from "./user";

export class Campaign {

    /*constructor(name: string, description: string, videolink: string,
         sumOfMoney: number, lastDateOfCampaign: Date, tags, bonuses, topic: Topic) {

            this.name = name;
            this.description = description;
            this.videoLink = videoLink;
            this.sumOfMoney = sumOfMoney;
            this.lastDateOfCampaign = lastDateOfCampaign;
            this.tags = tags;
            this.bonuses = bonuses;
            this.topic = topic;
        }*/

        constructor() {}
    
    id: number;

    user: User;
    
    name: string;
    
    description: string;
    
    videoLink: string;
    
    sumOfMoney: number;
    
    lastUpdateDate: Date;
    
    lastDateOfCampaign: Date;
    
    tags: Tag[];
    
    bonuses: Bonus[];
    
    pictures: any[];//
    
    topic: Topic;

}