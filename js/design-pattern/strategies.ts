// 策略模式
// 策略模式将具体业务逻辑封装到策略中,每一个策略都可以相互替换
// 策略模式与状态模式最大的差异在于各策略之间是相互平行的

interface Strategy {
    common1(...res)
    common2()
}

// 策略1
class Strategy1 implements Strategy {
    constructor() {

    }

    common1(...res) {

    }
    common2() {

    }
}

// 策略2
class Strategy2 implements Strategy {
    constructor() {

    }

    common1(...res) {

    }
    common2() {

    }
}

class Context {
    public strategy: Strategy;

    constructor() {

    }

    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    public common1(...res) {
        return this.strategy.common1(...res)
    }
}

const ctx = new Context();
ctx.setStrategy(new Strategy1())
ctx.common1()