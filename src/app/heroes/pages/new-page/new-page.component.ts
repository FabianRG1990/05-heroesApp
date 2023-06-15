import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HerosService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', {nonNullable: true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:         new FormControl(''),
  })

  public Publishers = [
    { id: 'DC Comics', desc: 'DC Comics'},
    { id: 'Marvel Comics', desc: 'Marvel Comics'}
  ];

constructor(
  private herosService: HerosService,
  private activatereRouter: ActivatedRoute,
  private router: Router,
  private snackbar: MatSnackBar,
  private dialog: MatDialog
  ){}



get currentHero(): Hero{
  const hero = this.heroForm.value as Hero;

  return hero;
}

ngOnInit(): void {

if (!this.router.url.includes('edit'))return;

this.activatereRouter.params
.pipe(
  switchMap(({id}) => this.herosService.getHeroById(id)),
).subscribe( hero => {
  if (!hero) { return this.router.navigateByUrl('/') };

  this.heroForm.reset(hero);
  return;
})

}

onSubmit(){

    if (this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.herosService.updateHero(this.currentHero)
      .subscribe( hero => {
        this.showSnackbar(`${hero.superhero} updated!` )
      })
      return;
    }

    this.herosService.addHero( this.currentHero)
    .subscribe(hero=>{
      this.router.navigate(['/heroes/edit', hero.id])
      this.showSnackbar(`${hero.superhero} created!`)      })

  };


  onDeleteHero(){
      if (!this.currentHero.id) throw Error ('Hero id is required')

      const dialogRef = this.dialog.open(ConfirmDialogComponent,{
        data: this.heroForm.value
      })

      dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result ),
        switchMap(() =>  this.herosService.deleteHeroById(this.currentHero.id)),
        filter((wasDelete: boolean) => wasDelete ),

        )

      .subscribe(() => {
        this.router.navigateByUrl('/heroes');      })
    }
  // onDeleteHero(){
  //   if (!this.currentHero.id) throw Error ('Hero id is required')

  //   const dialogRef = this.dialog.open(ConfirmDialogComponent,{
  //     data: this.heroForm.value
  //   })

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (!result)return;

  //     this.herosService.deleteHeroById(this.currentHero.id)
  //     .subscribe( wasDelete => {
  //       if (wasDelete)
  //       this.router.navigateByUrl('/heroes');
  //     } )


  //   })
  // }

  showSnackbar(massage: string) {
    this.snackbar.open(massage,'done',{duration : 3000})
  }

}
