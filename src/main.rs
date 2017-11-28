
#[derive(Debug)]

#[derive(Copy, Clone)]
enum State {
    Alive,
    Dead,
}

#[derive(Copy, Clone)]
struct Cellule {
    life_state: State
}

impl Cellule {

    pub fn set_alive(mut self) {
        self.life_state = State::Alive;
    }

}

struct GameOfLife {
    cellules: Vec<Cellule>
}

impl GameOfLife {

    pub fn new() -> GameOfLife {
        let cel0 = Cellule { life_state: State::Dead };
        let cel1 = Cellule { life_state: State::Dead };
        cel0.set_alive();
        GameOfLife { cellules: [cel0, cel1].to_vec() }
    }

    pub fn play(self) {
        // do something
        println!("{:?}", self.cellules[0].life_state);
    }

}

fn main() {

    let gof = GameOfLife::new();

    gof.play();

}
