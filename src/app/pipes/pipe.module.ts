import { NgModule } from '@angular/core';
import { ColorInversionPipe } from './color-inversion.pipe';
import { HslToHexPipe } from './hslToHex.pipe';

@NgModule({
    declarations: [
        ColorInversionPipe,
        HslToHexPipe
    ],
    imports: []
})
export class CustomPipeModule{

}
