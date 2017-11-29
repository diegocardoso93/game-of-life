
extern crate rand;

#[derive(Copy, Clone, Debug)]
enum State {
    Alive,
    Dead,
}

#[derive(Copy, Clone, Debug)]
struct Cellule {
    life_state: State
}

impl Cellule {

    pub fn set_alive(&mut self) {
        self.life_state = State::Alive;
    }

    pub fn print_state(&self) {
        println!("{:?}", self.life_state)
    }
}

struct GameOfLife {
    cellules: Box<[Cellule]>,
    cicles: u32
}

impl GameOfLife {

    pub fn new(size: usize, time: u32) -> GameOfLife {
        GameOfLife {
            cellules: vec![Cellule { life_state: State::Dead }; size].into_boxed_slice(),
            cicles: time
        }
    }

    pub fn random_mutate(&mut self) {
        for cellule in self.cellules.iter_mut() {
            if rand::random() {
                cellule.set_alive();
            }
        }
    }

    pub fn play(&self) {
        for cicle in 0..self.cicles {
            println!("cicle: {}", cicle);
            self.print_state();
        }
    }

    fn print_state(&self) {
        self.cellules.iter().for_each(Cellule::print_state);
    }

}

fn main() {

    let mut gof = GameOfLife::new(64, 2);
    gof.random_mutate();
    gof.play();

}