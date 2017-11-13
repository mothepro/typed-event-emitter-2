import * as untypedEventEmitter from 'events'

// Numbers should be valid event names
type eventName = string | symbol // | number

// fails because symbols can't be a key in typescript.
type eventWith1Arg = { [s: string]: any } // {[x: eventName]: any}

type eventWith2Arg = { [x: string]: [any, any] } // [x: eventName]: [any, any]

/**
 * An EventEmitter which doesn't emit any arguments to be used by listeners.
 */
declare class TypedEventEmitterNoArg<T extends eventName> extends untypedEventEmitter {
	addListener(event: T, listener: () => any): this
	on(event: T, listener: () => any): this
	once(event: T, listener: () => any): this
	removeListener(event: T, listener: () => any): this
	removeAllListeners(event?: T): this
	setMaxListeners(n: number): this
	getMaxListeners(): number
	listeners(event: T): (() => any)[];
	emit(event: T): boolean
	listenerCount(type: T): number
	prependListener(event: T, listener: () => any): this
	prependOnceListener(event: T, listener: () => any): this
	eventNames(): T[]
}

/**
 * An EventEmitter which emits exactly one argument to be used by listeners.
 */
declare class TypedEventEmitterOneArg<T extends eventWith1Arg> extends untypedEventEmitter {
	addListener<K extends keyof T>(event: K, listener: (arg: T[K]) => any): this
	on<K extends keyof T>(event: K, listener: (arg: T[K]) => any): this
	once<K extends keyof T>(event: K, listener: (arg: T[K]) => any): this
	removeListener<K extends keyof T>(event: K, listener: (arg: T[K]) => any): this
	removeAllListeners<K extends keyof T>(event?: K): this
	setMaxListeners(n: number): this
	getMaxListeners(): number
	listeners<K extends keyof T>(event: K): ((arg: T[K]) => any)[]
	emit<K extends keyof T>(event: K, arg: T[K]): boolean
	listenerCount<K extends keyof T>(type: K): number
	prependListener<K extends keyof T>(event: K, listener: (arg: T[K]) => any): this
	prependOnceListener<K extends keyof T>(event: K, listener: (arg: T[K]) => any): this
	eventNames<K extends keyof T>(): K[]
}

/**
 * An EventEmitter which emits exactly two arguments to be used by listeners.
 */
declare class TypedEventEmitterTwoArg<T extends eventWith2Arg> extends untypedEventEmitter {
	addListener<K extends keyof T>(event: K, listener: (arg1: T[K][0], arg2: T[K][1]) => any): this
	on<K extends keyof T>(event: K, listener: (arg1: T[K][0], arg2: T[K][1]) => any): this
	once<K extends keyof T>(event: K, listener: (arg1: T[K][0], arg2: T[K][1]) => any): this
	removeListener<K extends keyof T>(event: K, listener: (arg1: T[K][0], arg2: T[K][1]) => any): this
	removeAllListeners<K extends keyof T>(event?: K): this
	setMaxListeners(n: number): this
	getMaxListeners(): number
	listeners<K extends keyof T>(event: K): ((arg1: T[K][0], arg2: T[K][1]) => any)[]
	emit<K extends keyof T>(event: K, arg1: T[K][0], arg2: T[K][1]): boolean
	listenerCount<K extends keyof T>(type: K): number
	prependListener<K extends keyof T>(event: K, listener: (arg1: T[K][0], arg2: T[K][1]) => any): this
	prependOnceListener<K extends keyof T>(event: K, listener: (arg1: T[K][0], arg2: T[K][1]) => any): this
	eventNames<K extends keyof T>(): K[]
}

interface EventEmitterConstructor {
	new (): untypedEventEmitter

	new <T extends eventName>(): TypedEventEmitterNoArg<T>

	// new <T extends eventWith1Arg>(): TypedEventEmitterOneArg<T>

	new <T extends eventName, U extends eventWith1Arg>(): TypedEventEmitterNoArg<T> & TypedEventEmitterOneArg<U>

	// new <T extends eventWith1Arg, U extends eventName>(): TypedEventEmitterNoArg<U> & TypedEventEmitterOneArg<T>

	new <T extends eventName, U extends eventWith1Arg, V extends eventWith2Arg>(): TypedEventEmitterNoArg<T> & TypedEventEmitterOneArg<U> & TypedEventEmitterTwoArg<V>
}

// Make the untyped EventEmitter, Typed!
export default untypedEventEmitter as any as EventEmitterConstructor