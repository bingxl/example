
class Singleton {
    // 懒汉模式,调用 getInstance 时再实例化

    private static instance: Singleton;
    public name: string;

    // 饿汉模式
    // private static instance: Singleton = new Singleton

    private constructor(name: string) {
        // constructor 构造函数用 private 保护
        this.name = name
    }

    public static getInstance(name: string = "bingxl") {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton(name)
        }
        return Singleton.instance
    }
}

// true
console.log(Singleton.getInstance("bingxl1") === Singleton.getInstance("bingxl2"));

// bingxl1
console.log(Singleton.getInstance("bingxl3").name)