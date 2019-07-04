
let wasm;

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}
/**
* Starts the client.
* @param {any} wasm_ext
* @returns {Client}
*/
export function start_client(wasm_ext) {
    return Client.__wrap(wasm.start_client(addHeapObject(wasm_ext)));
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function passArrayJsValueToWasm(array) {
    const ptr = wasm.__wbindgen_malloc(array.length * 4);
    const mem = getUint32Memory();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

function doesNotExist() {
    throw new Error('imported function or type does not exist');
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
* A running client.
*/
export class Client {

    static __wrap(ptr) {
        const obj = Object.create(Client.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_client_free(ptr);
    }
    /**
    * Allows starting an RPC request. Returns a `Promise` containing the result of that request.
    * @param {string} rpc
    * @returns {any}
    */
    rpcSend(rpc) {
        const ptr0 = passStringToWasm(rpc);
        const len0 = WASM_VECTOR_LEN;
        try {
            return takeObject(wasm.client_rpcSend(this.ptr, ptr0, len0));

        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);

        }

    }
    /**
    * Subscribes to an RPC pubsub endpoint.
    * @param {string} rpc
    * @param {any} callback
    * @returns {void}
    */
    rpcSubscribe(rpc, callback) {
        const ptr0 = passStringToWasm(rpc);
        const len0 = WASM_VECTOR_LEN;
        try {
            return wasm.client_rpcSubscribe(this.ptr, ptr0, len0, addHeapObject(callback));

        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);

        }

    }
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(varg0);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        return false;
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        return addHeapObject(new Error());
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).stack);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);

        varg0 = varg0.slice();
        wasm.__wbindgen_free(arg0, arg1 * 1);

        console.error(varg0);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        return addHeapObject(getObject(arg0));
    };
    imports.wbg.__wbg_listenon_20b64b1cd99beb84 = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            return addHeapObject(getObject(arg0).listen_on(varg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_dial_8642218793c187f6 = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            return addHeapObject(getObject(arg0).dial(varg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_read_70187369787912b2 = function(arg0) {
        return addHeapObject(getObject(arg0).read);
    };
    imports.wbg.__wbg_close_748255b79ebc9daa = function(arg0) {
        getObject(arg0).close();
    };
    imports.wbg.__wbg_newaddrs_e6f65cbdd533fe53 = function(ret, arg0) {
        const val = getObject(arg0).new_addrs;
        const retptr = isLikeNone(val) ? [0, 0] : passArrayJsValueToWasm(val);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbg_newconnections_200592e1068050a9 = function(ret, arg0) {
        const val = getObject(arg0).new_connections;
        const retptr = isLikeNone(val) ? [0, 0] : passArrayJsValueToWasm(val);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbg_localaddr_231865464f1b1360 = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).local_addr);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbg_observedaddr_e2a5ade0d0923b64 = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).observed_addr);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbg_connection_9be02f25a1f7bd0e = function(arg0) {
        return addHeapObject(getObject(arg0).connection);
    };
    imports.wbg.__wbg_expiredaddrs_083480ee8f51744d = function(ret, arg0) {
        const val = getObject(arg0).expired_addrs;
        const retptr = isLikeNone(val) ? [0, 0] : passArrayJsValueToWasm(val);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        return getObject(arg0) === null;
    };
    imports.wbg.__wbg_write_f2093e16d6b51d73 = function(arg0, arg1, arg2) {
        let varg1 = getArrayU8FromWasm(arg1, arg2);
        try {
            return addHeapObject(getObject(arg0).write(varg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_shutdown_ec4f56d367c37767 = function(arg0) {
        try {
            getObject(arg0).shutdown();
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_instanceof_Window = function(arg0) {
        return getObject(arg0) instanceof Window;
    };
    imports.wbg.__widl_f_subtle_Crypto = function(arg0) {
        return addHeapObject(getObject(arg0).subtle);
    };
    imports.wbg.__widl_f_now_Performance = function(arg0) {
        return getObject(arg0).now();
    };
    imports.wbg.__widl_f_derive_bits_with_object_SubtleCrypto = function(arg0, arg1, arg2, arg3) {
        try {
            return addHeapObject(getObject(arg0).deriveBits(getObject(arg1), getObject(arg2), arg3 >>> 0));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_export_key_SubtleCrypto = function(arg0, arg1, arg2, arg3) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            return addHeapObject(getObject(arg0).exportKey(varg1, getObject(arg3)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_generate_key_with_object_SubtleCrypto = function(arg0, arg1, arg2, arg3) {
        try {
            return addHeapObject(getObject(arg0).generateKey(getObject(arg1), arg2 !== 0, getObject(arg3)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_import_key_with_object_SubtleCrypto = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            return addHeapObject(getObject(arg0).importKey(varg1, getObject(arg3), getObject(arg4), arg5 !== 0, getObject(arg6)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_performance_Window = function(arg0) {

        const val = getObject(arg0).performance;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_crypto_Window = function(arg0) {
        try {
            return addHeapObject(getObject(arg0).crypto);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_clear_timeout_with_handle_Window = function(arg0, arg1) {
        getObject(arg0).clearTimeout(arg1);
    };
    imports.wbg.__widl_f_set_timeout_with_callback_and_timeout_and_arguments_0_Window = function(arg0, arg1, arg2) {
        try {
            return getObject(arg0).setTimeout(getObject(arg1), arg2);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_debug_1_ = function(arg0) {
        console.debug(getObject(arg0));
    };
    imports.wbg.__widl_f_error_1_ = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__widl_f_info_1_ = function(arg0) {
        console.info(getObject(arg0));
    };
    imports.wbg.__widl_f_log_1_ = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__widl_f_warn_1_ = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__wbg_next_0f5d9584ef1627da = function(arg0) {
        try {
            return addHeapObject(getObject(arg0).next());
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_done_a9aaa2595d27799d = function(arg0) {
        return getObject(arg0).done;
    };
    imports.wbg.__wbg_value_5aec814aeef9e8ec = function(arg0) {
        return addHeapObject(getObject(arg0).value);
    };
    imports.wbg.__wbg_get_f6922348004f9279 = function(arg0, arg1) {
        try {
            return addHeapObject(Reflect.get(getObject(arg0), getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_call_836fa928f74337e5 = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).call(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_new_b3a6d73da508ceb3 = function() {
        return addHeapObject(new Array());
    };
    imports.wbg.__wbg_push_7936289c733f57be = function(arg0, arg1) {
        return getObject(arg0).push(getObject(arg1));
    };
    imports.wbg.__wbg_instanceof_Error_3e73dc251e577817 = function(arg0) {
        return getObject(arg0) instanceof Error;
    };
    imports.wbg.__wbg_message_bde5071b14c14ce5 = function(arg0) {
        return addHeapObject(getObject(arg0).message);
    };
    imports.wbg.__wbg_name_43513848b2f0764e = function(arg0) {
        return addHeapObject(getObject(arg0).name);
    };
    imports.wbg.__wbg_newnoargs_8d1797b163dbc9fb = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(new Function(varg0));
    };
    imports.wbg.__wbg_call_3d24f4e03e010931 = function(arg0, arg1, arg2) {
        try {
            return addHeapObject(getObject(arg0).call(getObject(arg1), getObject(arg2)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_now_d9ff59a9d063f1ca = typeof Date.now === 'undefined' ? doesNotExist : Date.now;
    imports.wbg.__wbg_instanceof_Object_90cc943967101f3c = function(arg0) {
        return getObject(arg0) instanceof Object;
    };
    imports.wbg.__wbg_new_b276d8d930d44595 = function() {
        return addHeapObject(new Object());
    };
    imports.wbg.__wbg_toString_7ade3a0d5928242d = function(arg0) {
        return addHeapObject(getObject(arg0).toString());
    };
    imports.wbg.__wbg_new_9a63f36b37c30713 = function(arg0, arg1) {
        let cbarg0 = function(arg0, arg1) {
            let a = this.a;
            this.a = 0;
            try {
                return this.f(a, this.b, addHeapObject(arg0), addHeapObject(arg1));

            } finally {
                this.a = a;

            }

        };
        cbarg0.f = wasm.__wbg_function_table.get(4575);
        cbarg0.a = arg0;
        cbarg0.b = arg1;
        try {
            return addHeapObject(new Promise(cbarg0.bind(cbarg0)));
        } finally {
            cbarg0.a = cbarg0.b = 0;

        }
    };
    imports.wbg.__wbg_resolve_3e3c14963c939fcd = function(arg0) {
        return addHeapObject(Promise.resolve(getObject(arg0)));
    };
    imports.wbg.__wbg_then_1469c8cdb2c56f2f = function(arg0, arg1) {
        return addHeapObject(getObject(arg0).then(getObject(arg1)));
    };
    imports.wbg.__wbg_then_ad0b568733866d25 = function(arg0, arg1, arg2) {
        return addHeapObject(getObject(arg0).then(getObject(arg1), getObject(arg2)));
    };
    imports.wbg.__wbg_buffer_e04d67bf3bf41917 = function(arg0) {
        return addHeapObject(getObject(arg0).buffer);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_9cfc37146f8a28ba = function(arg0, arg1, arg2) {
        return addHeapObject(new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0));
    };
    imports.wbg.__wbg_length_cfa4a8dd9fc9bbfc = function(arg0) {
        return getObject(arg0).length;
    };
    imports.wbg.__wbg_new_c745db9584dd061d = function(arg0) {
        return addHeapObject(new Uint8Array(getObject(arg0)));
    };
    imports.wbg.__wbg_set_2cce886d07c10f52 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_buffer_8e5aea6b31e81213 = function(arg0) {
        return addHeapObject(getObject(arg0).buffer);
    };
    imports.wbg.__wbg_set_001d7d49c8e6f145 = function(arg0, arg1, arg2) {
        try {
            return Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_new_3a746f2619705add = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(new Function(varg0));
    };
    imports.wbg.__wbg_call_f54d3a6dadb199ca = function(arg0, arg1) {
        return addHeapObject(getObject(arg0).call(getObject(arg1)));
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        return getObject(arg0) === getObject(arg1);
    };
    imports.wbg.__wbg_self_ac379e780a0d8b94 = function(arg0) {
        return addHeapObject(getObject(arg0).self);
    };
    imports.wbg.__wbg_require_6461b1e9a0d7c34a = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(require(varg0));
    };
    imports.wbg.__wbg_crypto_1e4302b85d4f64a2 = function(arg0) {
        return addHeapObject(getObject(arg0).crypto);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        return getObject(arg0) === undefined;
    };
    imports.wbg.__wbg_getRandomValues_1b4ba144162a5c9e = function(arg0) {
        return addHeapObject(getObject(arg0).getRandomValues);
    };
    imports.wbg.__wbg_getRandomValues_1ef11e888e5228e9 = function(arg0, arg1, arg2) {
        let varg1 = getArrayU8FromWasm(arg1, arg2);
        getObject(arg0).getRandomValues(varg1);
    };
    imports.wbg.__wbg_randomFillSync_1b52c8482374c55b = function(arg0, arg1, arg2) {
        let varg1 = getArrayU8FromWasm(arg1, arg2);
        getObject(arg0).randomFillSync(varg1);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg0);
        if (typeof(obj) !== 'string') return 0;
        const ptr = passStringToWasm(obj);
        getUint32Memory()[arg1 / 4] = WASM_VECTOR_LEN;
        return ptr;
    };
    imports.wbg.__wbindgen_debug_string = function(ret, arg0) {

        const retptr = passStringToWasm(debugString(getObject(arg0)));
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        throw new Error(varg0);
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_memory = function() {
        return addHeapObject(wasm.memory);
    };
    imports.wbg.__wbindgen_closure_wrapper11531 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(4559);
        const d = wasm.__wbg_function_table.get(4560);
        const b = arg1;
        const cb = function() {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b);

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
    };
    imports.wbg.__wbindgen_closure_wrapper8562 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(2528);
        const d = wasm.__wbg_function_table.get(2529);
        const b = arg1;
        const cb = function(arg0) {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b, addHeapObject(arg0));

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
    };

    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                return response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

export default init;

