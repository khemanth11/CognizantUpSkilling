interface Playable {

    void play();

}

class Guitar implements Playable {

    @Override
    public void play() {

        System.out.println("Playing Guitar");

    }

}

class Piano implements Playable {

    @Override
    public void play() {

        System.out.println("Playing Piano");

    }

}

public class PlayableTest {

    public static void main(String[] args) {

        Guitar guitar = new Guitar();

        guitar.play();

        Piano piano = new Piano();

        piano.play();

    }

}