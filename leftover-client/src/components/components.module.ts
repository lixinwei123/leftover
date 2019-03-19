import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register';
import { ShopListComponent } from './shop-list/shop-list';
import { MenuComponent } from './menu/menu';
@NgModule({
	declarations: [RegisterComponent,
    ShopListComponent,
    MenuComponent],
	imports: [],
	exports: [RegisterComponent,
    ShopListComponent,
    MenuComponent]
})
export class ComponentsModule {}
