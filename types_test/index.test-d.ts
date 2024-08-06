import { baseUrl } from 'marked-base-url';
import { MarkedExtension } from 'marked';
import { expectError, expectType } from 'tsd';

// Simple call
baseUrl('TestUrl');

// Minimal synchronous options argument
expectType<MarkedExtension>(baseUrl('TestUrl'));

// Invalid argument - missing baseUrl
expectError(baseUrl());
