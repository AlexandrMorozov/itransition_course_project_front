import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../domain/tag';
import { CampaignService } from '../../../services/component-services/campaignservice/campaign.service';
import { Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { TagService } from '../../../services/component-services/tag-service/tag.service';
import { TokenStorageService } from 'src/app/services/authorization/tokenstorageservice/token-storage.service';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {

  constructor(private tagService: TagService, private tokenService: TokenStorageService) {
   }
  @Input() tags: Tag[] = [];

  @Output() onTagChange = new EventEmitter<Tag[]>();

  autoTags: any[] = [];

  loadAllTagsSuggestions() {

    this.tagService.getAllTags().subscribe(
      data => { 
        this.autoTags = data; },
      err => {this.tokenService.signOut();});
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
