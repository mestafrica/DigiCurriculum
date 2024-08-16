import React from "react";

const StudentLibrary = () => {
  return (
      <div class="p-4">
        <div class="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search for materials by subject"
            class="border rounded-lg p-2 w-1/2"
          />
          <div class="flex space-x-4">
            <select class="border rounded-lg p-2">
              <option>Subject</option>
            </select>
            <select class="border rounded-lg p-2">
              <option>Material Type</option>
            </select>
            <button class="bg-blue-500 text-white rounded-lg p-2">
              More filters
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📄</span>
              <span class="ml-2 text-sm">Summary</span>
            </div>
            <h3 class="font-semibold mt-2">
              Summary of Prime and Composite Numbers
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>
          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📊</span>
              <span class="ml-2 text-sm">Presentation</span>
            </div>
            <h3 class="font-semibold mt-2">
              Proust’s Law of Definite Proportions Presentation
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📊</span>
              <span class="ml-2 text-sm">Presentation</span>
            </div>
            <h3 class="font-semibold mt-2">
              Accessory Terms of the Sentence: Abdominal...
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📊</span>
              <span class="ml-2 text-sm">Presentation</span>
            </div>
            <h3 class="font-semibold mt-2">
              Prepositions and Prepositional Phrases...
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📚</span>
              <span class="ml-2 text-sm">Book</span>
            </div>
            <h3 class="font-semibold mt-2">Orthogonal View | Book Chapter</h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📄</span>
              <span class="ml-2 text-sm">Summary</span>
            </div>
            <h3 class="font-semibold mt-2">
              Summary of Gravitation: Gravitational Force
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📄</span>
              <span class="ml-2 text-sm">Summary</span>
            </div>
            <h3 class="font-semibold mt-2">
              Summary of Prime and Composite Numbers
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>
          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📊</span>
              <span class="ml-2 text-sm">Presentation</span>
            </div>
            <h3 class="font-semibold mt-2">
              Proust’s Law of Definite Proportions Presentation
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📊</span>
              <span class="ml-2 text-sm">Presentation</span>
            </div>
            <h3 class="font-semibold mt-2">
              Accessory Terms of the Sentence: Abdominal...
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📊</span>
              <span class="ml-2 text-sm">Presentation</span>
            </div>
            <h3 class="font-semibold mt-2">
              Prepositions and Prepositional Phrases...
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📚</span>
              <span class="ml-2 text-sm">Book</span>
            </div>
            <h3 class="font-semibold mt-2">Orthogonal View | Book Chapter</h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4">
            <div class="flex items-center">
              <span class="text-blue-500">📄</span>
              <span class="ml-2 text-sm">Summary</span>
            </div>
            <h3 class="font-semibold mt-2">
              Summary of Gravitation: Gravitational Force
            </h3>
            <p class="text-zinc-500">Teachy</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-zinc-400">👍 (0)</span>
              <button class="text-zinc-400">...</button>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default StudentLibrary;
