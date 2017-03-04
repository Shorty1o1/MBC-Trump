import {Component, ViewChild, ElementRef} from "@angular/core";
import {Http} from "@angular/http";
import {MasterService} from "../service/masterService";

@Component({
    selector: 'app-home',
    templateUrl: 'app/home/home.html'
})

export class HomeComponent {

    private static PLAY_BUTTON_CLASS: string = "glyphicon glyphicon-play";
    private static PAUSE_BUTTON_CLASS: string = "glyphicon glyphicon-pause";

    private albumCoverLink: string = "../trumpCover.png";


    @ViewChild('toggleButton')
    private toggleButton: ElementRef;
    private isPlaying: Boolean = false;

    constructor(private http: Http, private masterService: MasterService) {

    };

    ngAfterViewInit(): void {
        let callback = (isPlayingObj) => {
            // this.isPlaying = isPlaying;
            this.isPlaying = isPlayingObj.isPlaying;
            this.updateToggleButton();
        }
        this.masterService.isPlayingRequest(callback);
    }

    private skip(): void {
        this.masterService.skip();
    }

    private backwardSkip(): void {
        this.masterService.backward();
    }

    private toggle(): void {
        if (this.isPlaying) {
            this.masterService.pause();
        } else {
            this.masterService.play();
        }
        this.isPlaying = !this.isPlaying;
        this.updateToggleButton();
    }

    private updateToggleButton(): void {
        console.log("STATE " + this.isPlaying);
        let state = HomeComponent.PLAY_BUTTON_CLASS;
        if (this.isPlaying) {
            state = HomeComponent.PAUSE_BUTTON_CLASS;
        }
        this.toggleButton.nativeElement.className = state;
    }


}