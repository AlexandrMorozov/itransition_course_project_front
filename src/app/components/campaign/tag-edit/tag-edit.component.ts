import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../domain/tag';
import { CampaignService } from '../../../services/campaignservice/campaign.service';
import { Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { TagService } from '../../../services/tag-service/tag.service';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {

  constructor(private tagService: TagService) {
   }
  @Input() tags: Tag[] = [];

  @Output() onTagChange = new EventEmitter<Tag[]>();

  autoTags: any[] = [];

  loadAllTagsSuggestions() {

    this.tagService.getAllTags().subscribe(
      data => { 
        //!!!!!
       // var tag: Tag[] = [];
       /* for (var i = 0; i < data.tags.length; i++) {
          var t = new Tag;
          t.id = data.tags[i].id;
          t.name = data.tags[i].name;
          tag.push(t);
        }*/
        this.autoTags = /*tag;*/data; },

      err => {console.log(err);});
  }

  onAdd(event) {
    this.onTagChange.emit(this.tags);
  }

  onRemove(event) {
    this.onTagChange.emit(this.tags);
  }

  ngOnInit(): void {
    this.loadAllTagsSuggestions();
  }

}
