
const __exports = {};
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
__exports.start_client = start_client

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

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function __wbg_error_4bb6c2a97407129a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);

    console.error(varg0);
}
__exports.__wbg_error_4bb6c2a97407129a = __wbg_error_4bb6c2a97407129a

function __wbg_new_59cb74e423758ede() {
    return addHeapObject(new Error());
}
__exports.__wbg_new_59cb74e423758ede = __wbg_new_59cb74e423758ede

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

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

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function __wbg_stack_558ba5917b466edd(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).stack);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}
__exports.__wbg_stack_558ba5917b466edd = __wbg_stack_558ba5917b466edd

function handleError(exnptr, e) {
    const view = getUint32Memory();
    view[exnptr / 4] = 1;
    view[exnptr / 4 + 1] = addHeapObject(e);
}

function __wbg_dial_ac4370788b6460ce(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(getObject(arg0).dial(varg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_dial_ac4370788b6460ce = __wbg_dial_ac4370788b6460ce

function __wbg_listenon_bbc3fb5ab8225af4(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(getObject(arg0).listen_on(varg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_listenon_bbc3fb5ab8225af4 = __wbg_listenon_bbc3fb5ab8225af4

function __wbg_read_f29a7add5e7aa9fe(arg0) {
    return addHeapObject(getObject(arg0).read);
}
__exports.__wbg_read_f29a7add5e7aa9fe = __wbg_read_f29a7add5e7aa9fe

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

function __wbg_write_4565518612d447d3(arg0, arg1, arg2, exnptr) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    try {
        return addHeapObject(getObject(arg0).write(varg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_write_4565518612d447d3 = __wbg_write_4565518612d447d3

function __wbg_shutdown_02baf50e79646b84(arg0, exnptr) {
    try {
        getObject(arg0).shutdown();
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_shutdown_02baf50e79646b84 = __wbg_shutdown_02baf50e79646b84

function __wbg_close_169df5e23eefe313(arg0) {
    getObject(arg0).close();
}
__exports.__wbg_close_169df5e23eefe313 = __wbg_close_169df5e23eefe313

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

function __wbg_newaddrs_794f74a57d04933d(ret, arg0) {
    const val = getObject(arg0).new_addrs;
    const retptr = isLikeNone(val) ? [0, 0] : passArrayJsValueToWasm(val);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}
__exports.__wbg_newaddrs_794f74a57d04933d = __wbg_newaddrs_794f74a57d04933d

function __wbg_expiredaddrs_a3bba0bfb59dc99c(ret, arg0) {
    const val = getObject(arg0).expired_addrs;
    const retptr = isLikeNone(val) ? [0, 0] : passArrayJsValueToWasm(val);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}
__exports.__wbg_expiredaddrs_a3bba0bfb59dc99c = __wbg_expiredaddrs_a3bba0bfb59dc99c

function __wbg_newconnections_ac8ebf9eaea78186(ret, arg0) {
    const val = getObject(arg0).new_connections;
    const retptr = isLikeNone(val) ? [0, 0] : passArrayJsValueToWasm(val);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}
__exports.__wbg_newconnections_ac8ebf9eaea78186 = __wbg_newconnections_ac8ebf9eaea78186

function __wbg_connection_25f4b098726c50a8(arg0) {
    return addHeapObject(getObject(arg0).connection);
}
__exports.__wbg_connection_25f4b098726c50a8 = __wbg_connection_25f4b098726c50a8

function __wbg_observedaddr_5eead70267a88cfe(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).observed_addr);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}
__exports.__wbg_observedaddr_5eead70267a88cfe = __wbg_observedaddr_5eead70267a88cfe

function __wbg_localaddr_5a9584c39df63ff2(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).local_addr);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}
__exports.__wbg_localaddr_5a9584c39df63ff2 = __wbg_localaddr_5a9584c39df63ff2

function __widl_f_subtle_Crypto(arg0) {
    return addHeapObject(getObject(arg0).subtle);
}
__exports.__widl_f_subtle_Crypto = __widl_f_subtle_Crypto

function __widl_f_now_Performance(arg0) {
    return getObject(arg0).now();
}
__exports.__widl_f_now_Performance = __widl_f_now_Performance

function __widl_f_derive_bits_with_object_SubtleCrypto(arg0, arg1, arg2, arg3, exnptr) {
    try {
        return addHeapObject(getObject(arg0).deriveBits(getObject(arg1), getObject(arg2), arg3 >>> 0));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__widl_f_derive_bits_with_object_SubtleCrypto = __widl_f_derive_bits_with_object_SubtleCrypto

function __widl_f_export_key_SubtleCrypto(arg0, arg1, arg2, arg3, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(getObject(arg0).exportKey(varg1, getObject(arg3)));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__widl_f_export_key_SubtleCrypto = __widl_f_export_key_SubtleCrypto

function __widl_f_generate_key_with_object_SubtleCrypto(arg0, arg1, arg2, arg3, exnptr) {
    try {
        return addHeapObject(getObject(arg0).generateKey(getObject(arg1), arg2 !== 0, getObject(arg3)));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__widl_f_generate_key_with_object_SubtleCrypto = __widl_f_generate_key_with_object_SubtleCrypto

function __widl_f_import_key_with_object_SubtleCrypto(arg0, arg1, arg2, arg3, arg4, arg5, arg6, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(getObject(arg0).importKey(varg1, getObject(arg3), getObject(arg4), arg5 !== 0, getObject(arg6)));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__widl_f_import_key_with_object_SubtleCrypto = __widl_f_import_key_with_object_SubtleCrypto

function __widl_instanceof_Window(idx) { return getObject(idx) instanceof Window ? 1 : 0; }
__exports.__widl_instanceof_Window = __widl_instanceof_Window

function __widl_f_performance_Window(arg0) {

    const val = getObject(arg0).performance;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}
__exports.__widl_f_performance_Window = __widl_f_performance_Window

function __widl_f_crypto_Window(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).crypto);
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__widl_f_crypto_Window = __widl_f_crypto_Window

function __widl_f_clear_timeout_with_handle_Window(arg0, arg1) {
    getObject(arg0).clearTimeout(arg1);
}
__exports.__widl_f_clear_timeout_with_handle_Window = __widl_f_clear_timeout_with_handle_Window

function __widl_f_set_timeout_with_callback_and_timeout_and_arguments_0_Window(arg0, arg1, arg2, exnptr) {
    try {
        return getObject(arg0).setTimeout(getObject(arg1), arg2);
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__widl_f_set_timeout_with_callback_and_timeout_and_arguments_0_Window = __widl_f_set_timeout_with_callback_and_timeout_and_arguments_0_Window

function __widl_f_debug_1_(arg0) {
    console.debug(getObject(arg0));
}
__exports.__widl_f_debug_1_ = __widl_f_debug_1_

function __widl_f_error_1_(arg0) {
    console.error(getObject(arg0));
}
__exports.__widl_f_error_1_ = __widl_f_error_1_

function __widl_f_info_1_(arg0) {
    console.info(getObject(arg0));
}
__exports.__widl_f_info_1_ = __widl_f_info_1_

function __widl_f_log_1_(arg0) {
    console.log(getObject(arg0));
}
__exports.__widl_f_log_1_ = __widl_f_log_1_

function __widl_f_warn_1_(arg0) {
    console.warn(getObject(arg0));
}
__exports.__widl_f_warn_1_ = __widl_f_warn_1_

function __wbg_new_acdbe9c25dc35c37() {
    return addHeapObject(new Array());
}
__exports.__wbg_new_acdbe9c25dc35c37 = __wbg_new_acdbe9c25dc35c37

function __wbg_push_60b55c9bdc824202(arg0, arg1) {
    return getObject(arg0).push(getObject(arg1));
}
__exports.__wbg_push_60b55c9bdc824202 = __wbg_push_60b55c9bdc824202

function __wbg_instanceof_Error_7b8282f5e91987e7(idx) { return getObject(idx) instanceof Error ? 1 : 0; }
__exports.__wbg_instanceof_Error_7b8282f5e91987e7 = __wbg_instanceof_Error_7b8282f5e91987e7

function __wbg_message_d88242616016bf36(arg0) {
    return addHeapObject(getObject(arg0).message);
}
__exports.__wbg_message_d88242616016bf36 = __wbg_message_d88242616016bf36

function __wbg_name_e60761cd8847ae32(arg0) {
    return addHeapObject(getObject(arg0).name);
}
__exports.__wbg_name_e60761cd8847ae32 = __wbg_name_e60761cd8847ae32

function __wbg_newnoargs_a172f39151049128(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}
__exports.__wbg_newnoargs_a172f39151049128 = __wbg_newnoargs_a172f39151049128

function __wbg_call_8a9c8b0a32a202ff(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_call_8a9c8b0a32a202ff = __wbg_call_8a9c8b0a32a202ff

function __wbg_call_6eed851d946419d8(arg0, arg1, arg2, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1), getObject(arg2)));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_call_6eed851d946419d8 = __wbg_call_6eed851d946419d8

function __wbg_next_1dc1c12b3aad066e(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).next());
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_next_1dc1c12b3aad066e = __wbg_next_1dc1c12b3aad066e

function __wbg_done_8b0657c71869dd76(arg0) {
    return getObject(arg0).done;
}
__exports.__wbg_done_8b0657c71869dd76 = __wbg_done_8b0657c71869dd76

function __wbg_value_efc53c71db10c238(arg0) {
    return addHeapObject(getObject(arg0).value);
}
__exports.__wbg_value_efc53c71db10c238 = __wbg_value_efc53c71db10c238

function __wbg_now_307a67b1c1d8ca31() {
    return Date.now();
}
__exports.__wbg_now_307a67b1c1d8ca31 = __wbg_now_307a67b1c1d8ca31

function __wbg_instanceof_Object_3ac4dd2f68c88a68(idx) { return getObject(idx) instanceof Object ? 1 : 0; }
__exports.__wbg_instanceof_Object_3ac4dd2f68c88a68 = __wbg_instanceof_Object_3ac4dd2f68c88a68

function __wbg_new_68180085d411e1be() {
    return addHeapObject(new Object());
}
__exports.__wbg_new_68180085d411e1be = __wbg_new_68180085d411e1be

function __wbg_toString_02832cd9a59ed13d(arg0) {
    return addHeapObject(getObject(arg0).toString());
}
__exports.__wbg_toString_02832cd9a59ed13d = __wbg_toString_02832cd9a59ed13d

function __wbg_new_7884206509213d02(arg0, arg1) {
    let cbarg0 = function(arg0, arg1) {
        let a = this.a;
        this.a = 0;
        try {
            return this.f(a, this.b, addHeapObject(arg0), addHeapObject(arg1));

        } finally {
            this.a = a;

        }

    };
    cbarg0.f = wasm.__wbg_function_table.get(4167);
    cbarg0.a = arg0;
    cbarg0.b = arg1;
    try {
        return addHeapObject(new Promise(cbarg0.bind(cbarg0)));
    } finally {
        cbarg0.a = cbarg0.b = 0;

    }
}
__exports.__wbg_new_7884206509213d02 = __wbg_new_7884206509213d02

function __wbg_resolve_7f1a97b982aed82d(arg0) {
    return addHeapObject(Promise.resolve(getObject(arg0)));
}
__exports.__wbg_resolve_7f1a97b982aed82d = __wbg_resolve_7f1a97b982aed82d

function __wbg_then_ad10ddb5ba4496f4(arg0, arg1) {
    return addHeapObject(getObject(arg0).then(getObject(arg1)));
}
__exports.__wbg_then_ad10ddb5ba4496f4 = __wbg_then_ad10ddb5ba4496f4

function __wbg_then_bd535717286c5b54(arg0, arg1, arg2) {
    return addHeapObject(getObject(arg0).then(getObject(arg1), getObject(arg2)));
}
__exports.__wbg_then_bd535717286c5b54 = __wbg_then_bd535717286c5b54

function __wbg_new_662b0aa231e9b27c(arg0) {
    return addHeapObject(new Uint8Array(getObject(arg0)));
}
__exports.__wbg_new_662b0aa231e9b27c = __wbg_new_662b0aa231e9b27c

function __wbg_newwithbyteoffsetandlength_533a05dbfbcbee36(arg0, arg1, arg2) {
    return addHeapObject(new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0));
}
__exports.__wbg_newwithbyteoffsetandlength_533a05dbfbcbee36 = __wbg_newwithbyteoffsetandlength_533a05dbfbcbee36

function __wbg_buffer_753594aef939ab1d(arg0) {
    return addHeapObject(getObject(arg0).buffer);
}
__exports.__wbg_buffer_753594aef939ab1d = __wbg_buffer_753594aef939ab1d

function __wbg_length_7b1c5e3634bc9051(arg0) {
    return getObject(arg0).length;
}
__exports.__wbg_length_7b1c5e3634bc9051 = __wbg_length_7b1c5e3634bc9051

function __wbg_set_55ad9d0789844e32(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
}
__exports.__wbg_set_55ad9d0789844e32 = __wbg_set_55ad9d0789844e32

function __wbg_get_48d637c66043532c(arg0, arg1, exnptr) {
    try {
        return addHeapObject(Reflect.get(getObject(arg0), getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_get_48d637c66043532c = __wbg_get_48d637c66043532c

function __wbg_set_8866dbb36cf947cb(arg0, arg1, arg2, exnptr) {
    try {
        return Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_set_8866dbb36cf947cb = __wbg_set_8866dbb36cf947cb

function __wbg_new_3a746f2619705add(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}
__exports.__wbg_new_3a746f2619705add = __wbg_new_3a746f2619705add

function __wbg_call_f54d3a6dadb199ca(arg0, arg1) {
    return addHeapObject(getObject(arg0).call(getObject(arg1)));
}
__exports.__wbg_call_f54d3a6dadb199ca = __wbg_call_f54d3a6dadb199ca

function __wbg_self_ac379e780a0d8b94(arg0) {
    return addHeapObject(getObject(arg0).self);
}
__exports.__wbg_self_ac379e780a0d8b94 = __wbg_self_ac379e780a0d8b94

function __wbg_crypto_1e4302b85d4f64a2(arg0) {
    return addHeapObject(getObject(arg0).crypto);
}
__exports.__wbg_crypto_1e4302b85d4f64a2 = __wbg_crypto_1e4302b85d4f64a2

function __wbg_getRandomValues_1b4ba144162a5c9e(arg0) {
    return addHeapObject(getObject(arg0).getRandomValues);
}
__exports.__wbg_getRandomValues_1b4ba144162a5c9e = __wbg_getRandomValues_1b4ba144162a5c9e

function __wbg_getRandomValues_1ef11e888e5228e9(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).getRandomValues(varg1);
}
__exports.__wbg_getRandomValues_1ef11e888e5228e9 = __wbg_getRandomValues_1ef11e888e5228e9

function __wbg_require_6461b1e9a0d7c34a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(require(varg0));
}
__exports.__wbg_require_6461b1e9a0d7c34a = __wbg_require_6461b1e9a0d7c34a

function __wbg_randomFillSync_1b52c8482374c55b(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).randomFillSync(varg1);
}
__exports.__wbg_randomFillSync_1b52c8482374c55b = __wbg_randomFillSync_1b52c8482374c55b

function __wbg_buffer_0b401f8e593a961e(arg0) {
    return addHeapObject(getObject(arg0).buffer);
}
__exports.__wbg_buffer_0b401f8e593a961e = __wbg_buffer_0b401f8e593a961e

function __wbindgen_string_new(p, l) { return addHeapObject(getStringFromWasm(p, l)); }
__exports.__wbindgen_string_new = __wbindgen_string_new

function __wbindgen_is_null(i) { return getObject(i) === null ? 1 : 0; }
__exports.__wbindgen_is_null = __wbindgen_is_null

function __wbindgen_is_undefined(i) { return getObject(i) === undefined ? 1 : 0; }
__exports.__wbindgen_is_undefined = __wbindgen_is_undefined

function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string') return 0;
    const ptr = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
    return ptr;
}
__exports.__wbindgen_string_get = __wbindgen_string_get

function __wbindgen_debug_string(i, len_ptr) {
    const debug_str =
    val => {
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
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
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
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
;
const toString = Object.prototype.toString;
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
}
__exports.__wbindgen_debug_string = __wbindgen_debug_string

function __wbindgen_cb_drop(i) {
    const obj = takeObject(i).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return 1;
    }
    return 0;
}
__exports.__wbindgen_cb_drop = __wbindgen_cb_drop

function __wbindgen_jsval_eq(a, b) { return getObject(a) === getObject(b) ? 1 : 0; }
__exports.__wbindgen_jsval_eq = __wbindgen_jsval_eq

function __wbindgen_memory() { return addHeapObject(wasm.memory); }
__exports.__wbindgen_memory = __wbindgen_memory

function __wbindgen_rethrow(idx) { throw takeObject(idx); }
__exports.__wbindgen_rethrow = __wbindgen_rethrow

function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}
__exports.__wbindgen_throw = __wbindgen_throw

function __wbindgen_closure_wrapper7190(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(2115);
    const d = wasm.__wbg_function_table.get(2116);
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
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}
__exports.__wbindgen_closure_wrapper7190 = __wbindgen_closure_wrapper7190

function __wbindgen_closure_wrapper10158(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(4152);
    const d = wasm.__wbg_function_table.get(4153);
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
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}
__exports.__wbindgen_closure_wrapper10158 = __wbindgen_closure_wrapper10158

function freeClient(ptr) {

    wasm.__wbg_client_free(ptr);
}
/**
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
        freeClient(ptr);
    }

    /**
    * @returns {any}
    */
    next_event() {
        return takeObject(wasm.client_next_event(this.ptr));
    }
}

function __wbindgen_object_clone_ref(idx) {
    return addHeapObject(getObject(idx));
}
__exports.__wbindgen_object_clone_ref = __wbindgen_object_clone_ref

function __wbindgen_object_drop_ref(i) { dropObject(i); }
__exports.__wbindgen_object_drop_ref = __wbindgen_object_drop_ref

function init(module) {
    let result;
    const imports = { './node_browser': __exports };

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

