import { Topic } from "./topic";
import { Tag } from "./tag";
import { Bonus } from './bonus';

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

    
    id: number;

    user;
    
    name: string;
    
    description: string;
    
    videoLink: string;
    
    sumOfMoney: number;
    
    lastUpdateDate: Date;
    
    lastDateOfCampaign: Date;
    
    tags: Tag[];
    
    bonuses: Bonus[];
    
   // pictures: any[];
    
    topic: Topic;

}