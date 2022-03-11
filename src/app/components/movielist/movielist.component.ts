import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinct,
  distinctUntilChanged,
  filter,
  forkJoin,
  fromEvent,
  map,
} from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { MovieList } from '../../models/movie-list';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss'],
})
export class MovielistComponent implements OnInit {
  movieList: MovieList[] = [];
  filteredMovieList: MovieList[] = [];
  genre: any = [];
  fiterGenre: any = [];
  title!: string;
  isDesc: boolean = true;

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  constructor(private movieservice: MovieService) {}

  ngOnInit(): void {
    this.getMovieGenre();
    this.search();
  }
  getMovieLists() {
    this.movieservice.getMovie().subscribe((response) => {
      console.log(response.results);
      this.movieList = response.results;
      for (let item of this.movieList) {
        for (let genreid of item.genre_ids) {
          const genre = this.genre.find((item: any) => item.id === genreid);
          if (!item['genre']) {
            item['genre'] = [];
          }
          item['genre'].push(genre.name.toLowerCase());
        }
      }
      console.log(this.movieList);
      this.filteredMovieList = this.movieList;
    });
  }

  getMovieGenre() {
    this.movieservice.getGenre().subscribe((response) => {
      console.log(response.genres);
      this.genre = response.genres;
      this.getMovieLists();
    });
  }
  search() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        console.log(text);
        this.filteredMovieList = this.movieList.filter(
          (res) =>
            res.title.toLocaleLowerCase().includes(text) ||
            res.genre.includes(text)
        );
      });
  }

  sort(property: string) {
    this.isDesc = !this.isDesc;
    let direction = this.isDesc ? 1 : -1;
    console.log(property, 'property');
    this.filteredMovieList.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
