# typed-event-emitter-2

This module provides a strict usage and implementation of Node.js' EventEmitter
API. Without needing to rely on another implementation. Arbitrary events or listeners
can not be added without a TypeScript compile time error.

## Install

    $ npm i typed-event-emitter-2

## Usage
Before using Node.js / Browsers conventional `EventEmitter`.

```TypeScript
import * as UntypedEventEmitter from 'events';

const conventionalEventEmitter = new UntypedEventEmitter();

conventionalEventEmitter
    .on('foo', (arg: number) => console.log(Math.abs(arg)))
    .on('bar', (arg: string) => console.log(arg.length))
    .on('baz', () => console.log('baz'));

conventionalEventEmitter.emit('foo', 1);
conventionalEventEmitter.emit('foo'); // Should have an error
conventionalEventEmitter.emit('bar', 'bar');
conventionalEventEmitter.emit('bar', 1); // Should have an error
conventionalEventEmitter.emit('baz');
conventionalEventEmitter.emit('baz', 'bar'); // Should have an error
```

Using a type safe EventEmitter with no arguments in listeners.
```TypeScript
import TypedEventEmitter from 'typed-event-emitter-2';

const typedEventEmitterNoArgs = new TypedEventEmitter<'foo' | 'baz'>();

typedEventEmitterNoArgs
    .on('foo', () => console.log('foo'))
    .on('baz', () => console.log('baz'));

typedEventEmitterNoArgs.emit('baz');
typedEventEmitterNoArgs.emit('foo');
```

Using a type safe EventEmitter with one argument in listeners.
```TypeScript
import TypedEventEmitter from 'typed-event-emitter-2';

class TypedEventEmitterOneArg extends TypedEventEmitter<never, {
    foo: number
    bar: string
}> {}

const typedEventEmitterOneArg = new TypedEventEmitterOneArg();
typedEventEmitterOneArg
    .on('foo', (arg: number) => console.log(Math.abs(arg)))
    .on('bar', (arg: string) => console.log(arg.length));

typedEventEmitterOneArg.emit('foo', 1);
typedEventEmitterOneArg.emit('bar', 'bar');
```

Using a type safe EventEmitter with zero or one arguments in listeners.
```TypeScript
import TypedEventEmitter from 'typed-event-emitter-2';

enum keys {
    baz,
    zoo,
};

const typedEventEmitterMix = new TypedEventEmitter<
	keyof typeof keys,
	{
    	foo: number
    	bar: string
	}
>();

typedEventEmitterMix
    .on('foo', (arg: number) => console.log(Math.abs(arg)))
    .on('bar', (arg: string) => console.log(arg.length))
    .on('baz', () => console.log('baz'));

typedEventEmitterMix.emit('foo', 1);
typedEventEmitterMix.emit('bar', 'bar');
typedEventEmitterMix.emit('zoo');
```

## License

`typed-event-emitter-2` is licensed under the ISC License.