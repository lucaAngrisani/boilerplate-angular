import { Pipe } from "@angular/core";

@Pipe({
    name: "example"
})
export class ExamplePipe {
    transform(): string {
        return 'Exampled'
    }
}