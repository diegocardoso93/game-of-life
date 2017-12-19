
extern crate rand;

#[derive(Copy, Clone, Debug, PartialEq)]
enum LifeState {
    Live,
    Dead,
}

#[derive(Copy, Clone, Debug)]
struct Cellule {
    life_state: LifeState
}

impl Cellule {

    pub fn set_alive(&mut self) {
        self.life_state = LifeState::Live;
    }

    pub fn set_dead(&mut self) {
        self.life_state = LifeState::Dead;
    }

    pub fn print_state(&self) {
        print!("{:?}", self.life_state)
    }

    pub fn is_alive(self) -> bool {
        self.life_state == LifeState::Live
    }

    pub fn count_live_neighbor(&mut self, neighbor: &[Cellule]) -> u32 {
        let mut live : u32 = 0;
        for neighbor in neighbor {
            if neighbor.is_alive() {
                live += 1;
            }
        }
        live
    }

    pub fn is_loneliness(&mut self, neighbors: &[Cellule]) -> bool {
        self.count_live_neighbor(neighbors)<2
    }

    pub fn is_overpopulation(&mut self, neighbors: &[Cellule]) -> bool {
        self.count_live_neighbor(neighbors)>3
    }

    pub fn revive(&mut self, neighbors: &[Cellule]) -> bool {
        self.count_live_neighbor(neighbors)==3
    }

}

struct GameOfLife {
    cellules: Vec<Vec<Cellule>>,
    cicles: u32,
    size: usize
}

impl GameOfLife {

    pub fn new(size: usize, time: u32) -> GameOfLife {
        GameOfLife {
            cellules: vec![vec![Cellule { life_state: LifeState::Dead }; size]; size],
            cicles: time,
            size: size
        }
    }

    pub fn random_mutate(&mut self) {
        for row_of_cellules in self.cellules.iter_mut() {
            for cellule in row_of_cellules {
                if rand::random() {
                    cellule.set_alive();
                }
            }
        }
    }

    pub fn play(&mut self) {
        for cicle in 0..self.cicles {
            println!("cicle: {}", cicle);
            self.print_state();
            self.commute();
        }
    }

    fn print_state(&mut self) {
        for row in 0..self.size {
            for col in 0..self.size {
                print!(" ");
                self.cellules[row][col].print_state();
            }
            print!("\n");
        }
    }

    pub fn commute(&mut self) {
        let mut not_committed = self.cellules.clone();
        for row in 0..self.size {
            for col in 0..self.size {
                let mut neighbors = Vec::new();
                if row>0 && col>0 { neighbors.push(not_committed[row-1][col-1]); }
                if row>0 && col>0 { neighbors.push(not_committed[row][col-1]); }
                if row>0 && col>0 { neighbors.push(not_committed[row-1][col]); }
                if row<self.size-1 && col<self.size-1 { neighbors.push(not_committed[row+1][col+1]) }
                if row<self.size-1 && col<self.size-1 { neighbors.push(not_committed[row][col+1]) }
                if row<self.size-1 && col<self.size-1 { neighbors.push(not_committed[row+1][col]) }
                if row>0 && col<self.size-1 { neighbors.push(not_committed[row-1][col+1]) }
                if row>self.size-1 && col>0 { neighbors.push(not_committed[row+1][col-1]) }

                if not_committed[row][col].is_alive() {
                    if not_committed[row][col].is_loneliness(&neighbors) {
                        self.cellules[row][col].set_dead();
                    }
                    if not_committed[row][col].is_overpopulation(&neighbors) {
                        self.cellules[row][col].set_dead();
                    }
                } else {
                    if not_committed[row][col].revive(&neighbors) {
                        self.cellules[row][col].set_alive();
                    }
                }

            }
        }
    }

}

fn main() {

    let mut gof = GameOfLife::new(16, 2);
    gof.random_mutate();
    gof.play();

}
