// 状态模式, 每一个状态用一个子类表示,将请求操作委托给对应的状态子类来操作
// 状态模式最重要的思想是将具体的处理放到子状态类中,

abstract class State {
    protected context: Context;
    public setContext(context: Context) {
        this.context = context
    }

    public abstract handle();
}

// 具体状态, context将具体的处理代理到对应的状态类中.
class ConcreteState1 extends State {
    public handle() {
        // 当前状态下的具体实现方式
        // 在具体状态类中也可以进行状态转移
        // this.setContext
        console.log("状态1的行为处理")
    }
}
// 具体状态
class ConcreteState2 extends State {
    public handle() {
        console.log("状态2的行为处理")
    }
}

// 上下文
class Context {
    public static STATE1: State = new ConcreteState1();
    public static STATE2: State = new ConcreteState2();
    private currentState: State;

    public constructor() {
        this.setCurrentState(Context.STATE1);
    }

    public getCurrentState(): State {
        return this.currentState;
    }

    public setCurrentState(currentState: State) {
        this.currentState = currentState
    }

    // 行为委托
    public handle() {
        // this.setCurrentState(Context.STATE1)
        // 将具体的处理交给状态类处理,不用写很多代码来判断当前状态和将要进行的处理
        this.currentState.handle();
    }

}


const context: Context = new Context()

context.handle();
context.setCurrentState(Context.STATE2)
context.handle();
