import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register';
import { ShopListComponent } from './shop-list/shop-list';
import { MenuComponent } from './menu/menu';
import { ListsComponent } from './lists/lists';
import { ListDetailComponent } from './list-detail/list-detail';
@NgModule({
	declarations: [RegisterComponent,
    ShopListComponent,
    MenuComponent,
    ListsComponent,
    ListDetailComponent],
	imports: [],
	exports: [RegisterComponent,
    ShopListComponent,
    MenuComponent,
    ListsComponent,
    ListDetailComponent]
})
export class ComponentsModule {}
