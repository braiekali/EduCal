import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FoyerService } from '../service/foyer.service';
import { MatPaginator } from '@angular/material/paginator';
import { Foyer } from '../model/Foyer';

@Component({
  selector: 'app-foyer-list',
  templateUrl: './foyer-list.component.html',
  styleUrls: ['./foyer-list.component.scss']
})
export class FoyerListComponent implements AfterViewInit {
  isLiked: boolean = false;
  searchTerm: string = '';
  foyerList: Foyer[];
  dataSource: any;
  cards: Foyer[] = [];
  pagedCards = [];
  totalCards: number = 0;
  pageSize: number = 4;
  pageSizeOptions: number[] = [4, 10, 25, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private foyerService: FoyerService ) { }
  
  likeFoyer(foyer: Foyer): void {
    this.foyerService.likeFoyer(foyer.idFoyer).subscribe(
      (like) => {
        foyer.likeFoyer = like.likeFoyer;
        this.isLiked = true;
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du like :', error);
      }
    );
  }

  dislikeFoyer(foyer: Foyer): void {
    this.foyerService.dislikeFoyer(foyer.idFoyer).subscribe(
      (dislike) => {
        foyer.dislikeFoyer = dislike.dislikeFoyer;
        this.isLiked = false;
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du dislike :', error);
      }
    );
  }

  ngOnInit(): void { 
 
    this.foyerService.getListFoyer().subscribe(
      (data: any) => {
        this.foyerList = data;
        console.log(this.foyerList)
        this.updatePaginator()
      },
      (error) => {
        console.error('Une erreur est survenue :', error);
      }
    );
  }

  ngAfterViewInit(): void {
 
  }

  onPageChange(event: any): void {
    this.updatePagedCards(event.pageIndex, event.pageSize);
  }

  updatePagedCards(
    pageIndex: number = 0,
    pageSize: number = this.pageSize
  ): void {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.foyerList = this.cards.slice(
      startIndex,
      endIndex
    );
  }

  updatePaginator() {
    this.cards = this.foyerList;
    this.totalCards = this.cards.length;
    this.updatePagedCards();
  }



}
