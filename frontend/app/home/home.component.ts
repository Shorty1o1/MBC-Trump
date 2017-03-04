import {Component, ViewChild, ElementRef} from "@angular/core";
import {Http} from "@angular/http";
import {MasterService} from "../service/masterService";

@Component({
    selector: 'app-home',
    templateUrl: 'app/home/home.html'
})

export class HomeComponent {

    private static PLAY_BUTTON_CLASS: String = "glyphicon glyphicon-play";
    private static PAUSE_BUTTON_CLASS: String = "glyphicon glyphicon-pause";


    @ViewChild('toggleButton')
    private playPauseButton: ElementRef;
    private toggleButton: HTMLButtonElement;
    private isPlaying: Boolean = false;

    constructor(private http: Http, private masterService: MasterService) {

    };

    ngAfterViewInit(): void {
        this.toggleButton = this.playPauseButton.nativeElement as HTMLButtonElement;
    }

    private skip(): void {
        this.masterService.sendSkip();
    }

    private backwardSkip(): void {
        this.masterService.sendBackwardSkip();
    }

    private toggle(): void {
        if ("play" == "play") {
            this.masterService.sendPause();
        } else {
            this.masterService.sendPlay();
        }
    }


}
