import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { CourseService } from "../courses/courseService.service";

@Component({
    selector: "my-modal",
    moduleId: module.id,
    templateUrl: "tag.modal.html"
})
export class ModalComponent {

    public frameworks = [];

    public constructor(private params: ModalDialogParams, private courseService:CourseService) {
/*
        this.frameworks = [
            "NativeScript",
            "Xamarin",
            "Onsen UI",
            "Ionic Framework",
            "React Native"
        ];
        */
        this.frameworks = this.courseService.getCoursesFromFirebase();
    }

    public close(res: string) {
        this.params.closeCallback(res);
    }

}
