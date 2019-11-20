
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
function __wbg_elem_binding0(arg0, arg1, arg2) {
    wasm.__wbg_function_table.get(3184)(arg0, arg1, addHeapObject(arg2));
}
function __wbg_elem_binding1(arg0, arg1) {
    wasm.__wbg_function_table.get(3760)(arg0, arg1);
}
function __wbg_elem_binding2(arg0, arg1) {
    wasm.__wbg_function_table.get(2947)(arg0, arg1);
}
function __wbg_elem_binding3(arg0, arg1, arg2, arg3) {
    wasm.__wbg_function_table.get(3775)(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}
/**
* Starts the client.
*
* You must pass a libp2p transport that supports .
* @param {any} wasm_ext
* @returns {Client}
*/
export function start_client(wasm_ext) {
    const ret = wasm.start_client(addHeapObject(wasm_ext));
    return Client.__wrap(ret);
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function passStringToWasm(arg) {

    let len = arg.length;
    let ptr = wasm.__wbindgen_malloc(len);

    const mem = getUint8Memory();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = wasm.__wbindgen_realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
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

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachegetInt32Memory = null;
function getInt32Memory() {
    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory;
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
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
        const ret = wasm.client_rpcSend(this.ptr, passStringToWasm(rpc), WASM_VECTOR_LEN);
        return takeObject(ret);
    }
    /**
    * Subscribes to an RPC pubsub endpoint.
    * @param {string} rpc
    * @param {any} callback
    */
    rpcSubscribe(rpc, callback) {
        wasm.client_rpcSubscribe(this.ptr, passStringToWasm(rpc), WASM_VECTOR_LEN, addHeapObject(callback));
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
        const ret = getStringFromWasm(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ret0 = passStringToWasm(ret);
        const ret1 = WASM_VECTOR_LEN;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        const v0 = getStringFromWasm(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 1);
        console.error(v0);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_listenon_2b4dbb5647457cb7 = function(arg0, arg1, arg2) {
        try {
            const ret = getObject(arg0).listen_on(getStringFromWasm(arg1, arg2));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_dial_5d7317a49d01db1f = function(arg0, arg1, arg2) {
        try {
            const ret = getObject(arg0).dial(getStringFromWasm(arg1, arg2));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_read_378b2bd5fa2b387e = function(arg0) {
        const ret = getObject(arg0).read;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_close_57d7f33e4d4fb26c = function(arg0) {
        getObject(arg0).close();
    };
    imports.wbg.__wbg_newaddrs_3dceb634766d3479 = function(arg0, arg1) {
        const ret = getObject(arg1).new_addrs;
        const ptr0 = isLikeNone(ret) ? 0 : passArrayJsValueToWasm(ret);
        const len0 = WASM_VECTOR_LEN;
        const ret0 = ptr0;
        const ret1 = len0;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbg_newconnections_3dfff815d97f94a1 = function(arg0, arg1) {
        const ret = getObject(arg1).new_connections;
        const ptr0 = isLikeNone(ret) ? 0 : passArrayJsValueToWasm(ret);
        const len0 = WASM_VECTOR_LEN;
        const ret0 = ptr0;
        const ret1 = len0;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbg_localaddr_3145503fefa6746f = function(arg0, arg1) {
        const ret = getObject(arg1).local_addr;
        const ret0 = passStringToWasm(ret);
        const ret1 = WASM_VECTOR_LEN;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbg_observedaddr_10372cb0eeec4612 = function(arg0, arg1) {
        const ret = getObject(arg1).observed_addr;
        const ret0 = passStringToWasm(ret);
        const ret1 = WASM_VECTOR_LEN;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbg_connection_5fefaea80648d679 = function(arg0) {
        const ret = getObject(arg0).connection;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_expiredaddrs_00084949b21222f4 = function(arg0, arg1) {
        const ret = getObject(arg1).expired_addrs;
        const ptr0 = isLikeNone(ret) ? 0 : passArrayJsValueToWasm(ret);
        const len0 = WASM_VECTOR_LEN;
        const ret0 = ptr0;
        const ret1 = len0;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = getObject(arg0) === null;
        return ret;
    };
    imports.wbg.__wbg_write_daf72e70ef97176d = function(arg0, arg1, arg2) {
        try {
            const ret = getObject(arg0).write(getArrayU8FromWasm(arg1, arg2));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_shutdown_0e377db748fcd6f0 = function(arg0) {
        try {
            getObject(arg0).shutdown();
        } catch (e) {
            handleError(e)
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
    imports.wbg.__widl_instanceof_Window = function(arg0) {
        const ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__widl_f_subtle_Crypto = function(arg0) {
        const ret = getObject(arg0).subtle;
        return addHeapObject(ret);
    };
    imports.wbg.__widl_f_now_Performance = function(arg0) {
        const ret = getObject(arg0).now();
        return ret;
    };
    imports.wbg.__widl_f_derive_bits_with_object_SubtleCrypto = function(arg0, arg1, arg2, arg3) {
        try {
            const ret = getObject(arg0).deriveBits(getObject(arg1), getObject(arg2), arg3 >>> 0);
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_export_key_SubtleCrypto = function(arg0, arg1, arg2, arg3) {
        try {
            const ret = getObject(arg0).exportKey(getStringFromWasm(arg1, arg2), getObject(arg3));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_generate_key_with_object_SubtleCrypto = function(arg0, arg1, arg2, arg3) {
        try {
            const ret = getObject(arg0).generateKey(getObject(arg1), arg2 !== 0, getObject(arg3));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_import_key_with_object_SubtleCrypto = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        try {
            const ret = getObject(arg0).importKey(getStringFromWasm(arg1, arg2), getObject(arg3), getObject(arg4), arg5 !== 0, getObject(arg6));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_performance_Window = function(arg0) {
        const ret = getObject(arg0).performance;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__widl_f_crypto_Window = function(arg0) {
        try {
            const ret = getObject(arg0).crypto;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_clear_timeout_with_handle_Window = function(arg0, arg1) {
        getObject(arg0).clearTimeout(arg1);
    };
    imports.wbg.__widl_f_set_timeout_with_callback_and_timeout_and_arguments_0_Window = function(arg0, arg1, arg2) {
        try {
            const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
            return ret;
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_next_81628b1c8473d796 = function(arg0) {
        try {
            const ret = getObject(arg0).next();
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_done_cd1e7104a531367c = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_30dd3fdb46a8b5be = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_5776bf9cf68ec072 = function(arg0, arg1) {
        try {
            const ret = Reflect.get(getObject(arg0), getObject(arg1));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_call_aa56d0132fec7569 = function(arg0, arg1) {
        try {
            const ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_new_8caf63c832ef170c = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_3ed2be796ba59b8b = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_instanceof_Error_d64d3207931d9ea3 = function(arg0) {
        const ret = getObject(arg0) instanceof Error;
        return ret;
    };
    imports.wbg.__wbg_message_efb346c1d66478f6 = function(arg0) {
        const ret = getObject(arg0).message;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_name_639a807ce9cb27d4 = function(arg0) {
        const ret = getObject(arg0).name;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_0c3c518a7f7c56bf = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_34f87007c5d2a397 = function(arg0, arg1, arg2) {
        try {
            const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_now_2a2b62626fe33646 = function() {
        const ret = Date.now();
        return ret;
    };
    imports.wbg.__wbg_instanceof_Object_bea2d831999798b1 = function(arg0) {
        const ret = getObject(arg0) instanceof Object;
        return ret;
    };
    imports.wbg.__wbg_new_de17f04ab3be4063 = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_toString_a6c9b09e8deab0a4 = function(arg0) {
        const ret = getObject(arg0).toString();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_5e8d465c199e6ff3 = function(arg0, arg1) {
        const state0 = {a: arg0, b: arg1};
        const cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_elem_binding3(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        try {
            const ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_resolve_04ca3cb0d333a4f0 = function(arg0) {
        const ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_1fa2e92ee4bdbc93 = function(arg0, arg1) {
        const ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_486e2e2b1fb1bbf4 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_globalThis_4fa2faeae7a7a380 = function() {
        try {
            const ret = globalThis.globalThis;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_self_ed02073ec1d8fef4 = function() {
        try {
            const ret = self.self;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_window_356847be61f4a80f = function() {
        try {
            const ret = window.window;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_global_6580a67633b0dbc1 = function() {
        try {
            const ret = global.global;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_buffer_ef21d491a7c39636 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_c37b706ac242f87a = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_906ccf3f0ad7bb55 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_3d6d9032174a593f = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_271114abb626ccb3 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_buffer_4a6a9fdd4eda8d63 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_e11a72d9733dadef = function(arg0, arg1, arg2) {
        try {
            const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
            return ret;
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_new_3a746f2619705add = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_f54d3a6dadb199ca = function(arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = getObject(arg0) === getObject(arg1);
        return ret;
    };
    imports.wbg.__wbg_self_ac379e780a0d8b94 = function(arg0) {
        const ret = getObject(arg0).self;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_crypto_1e4302b85d4f64a2 = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getRandomValues_1b4ba144162a5c9e = function(arg0) {
        const ret = getObject(arg0).getRandomValues;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_6461b1e9a0d7c34a = function(arg0, arg1) {
        const ret = require(getStringFromWasm(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_randomFillSync_1b52c8482374c55b = function(arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm(arg1, arg2));
    };
    imports.wbg.__wbg_getRandomValues_1ef11e888e5228e9 = function(arg0, arg1, arg2) {
        getObject(arg0).getRandomValues(getArrayU8FromWasm(arg1, arg2));
    };
    imports.wbg.__wbg_self_e70540c4956ad879 = function() {
        try {
            const ret = self.self;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_require_9edeecb69c9dc31c = function(arg0, arg1) {
        const ret = require(getStringFromWasm(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_crypto_58b0c631995fea92 = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getRandomValues_532ec62d8e780edc = function(arg0) {
        const ret = getObject(arg0).getRandomValues;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getRandomValues_40ceff860009fa55 = function(arg0, arg1, arg2) {
        getObject(arg0).getRandomValues(getArrayU8FromWasm(arg1, arg2));
    };
    imports.wbg.__wbg_randomFillSync_eabbc18af655bfbe = function(arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm(arg1, arg2));
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg0);
        if (typeof(obj) !== 'string') return 0;
        const ptr = passStringToWasm(obj);
        getUint32Memory()[arg1 / 4] = WASM_VECTOR_LEN;
        const ret = ptr;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ret0 = passStringToWasm(ret);
        const ret1 = WASM_VECTOR_LEN;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper9555 = function(arg0, arg1, arg2) {
        const state = { a: arg0, b: arg1, cnt: 1 };
        const real = (arg0) => {
            state.cnt++;
            const a = state.a;
            state.a = 0;
            try {
                return __wbg_elem_binding0(a, state.b, arg0);
            } finally {
                if (--state.cnt === 0) wasm.__wbg_function_table.get(3185)(a, state.b);
                else state.a = a;
            }
        }
        ;
        real.original = state;
        const ret = real;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper10552 = function(arg0, arg1, arg2) {
        const state = { a: arg0, b: arg1, cnt: 1 };
        const real = () => {
            state.cnt++;
            const a = state.a;
            state.a = 0;
            try {
                return __wbg_elem_binding1(a, state.b, );
            } finally {
                if (--state.cnt === 0) wasm.__wbg_function_table.get(3761)(a, state.b);
                else state.a = a;
            }
        }
        ;
        real.original = state;
        const ret = real;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper9037 = function(arg0, arg1, arg2) {
        const state = { a: arg0, b: arg1, cnt: 1 };
        const real = () => {
            state.cnt++;
            const a = state.a;
            state.a = 0;
            try {
                return __wbg_elem_binding2(a, state.b, );
            } finally {
                if (--state.cnt === 0) wasm.__wbg_function_table.get(2948)(a, state.b);
                else state.a = a;
            }
        }
        ;
        real.original = state;
        const ret = real;
        return addHeapObject(ret);
    };

    if ((typeof URL === 'function' && module instanceof URL) || typeof module === 'string' || (typeof Request === 'function' && module instanceof Request)) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                return response
                .then(r => {
                    if (r.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                        return r.arrayBuffer();
                    } else {
                        throw e;
                    }
                })
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

