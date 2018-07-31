import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatNativeDateModule, MatExpansionModule, MatListModule,
         MatDatepickerModule, MatSelectModule, MatDialogModule, MatSnackBarModule,
         MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatMenuModule,
         MatSidenavModule, MatDividerModule, MatToolbarModule, MatFormFieldModule, MatTableModule,
         MatPaginatorModule, MatSortModule, MatPaginatorIntl } from '@angular/material';
// import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatDividerModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatListModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatAutocompleteModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatDividerModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatListModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatAutocompleteModule
    ],
    providers: [],
    declarations: []
})
export class MaterialModule {}
