class MyThread extends Thread {

    public void run() {

        for (int i = 1; i <= 5; i++) {

            System.out.println("Thread 1 Running");

        }

    }

}

class MyRunnable implements Runnable {

    public void run() {

        for (int i = 1; i <= 5; i++) {

            System.out.println("Thread 2 Running");

        }

    }

}

public class ThreadExample {

    public static void main(String[] args) {

        MyThread t1 = new MyThread();

        Thread t2 = new Thread(new MyRunnable());

        t1.start();

        t2.start();

    }

}