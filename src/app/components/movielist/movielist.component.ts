import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MovieList } from '../../models/movie-list';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss'],
})
export class MovielistComponent implements OnInit {
  movieList: MovieList[] = [];

  constructor(private movieservice: MovieService) {}

  ngOnInit(): void {
    this.getMovieLists();
  }
  getMovieLists() {
    this.movieservice.getMovie().subscribe((response) => {
      console.log(response.results);
      this.movieList = response.results;
    });
  }
}
