import React from "react";

const Tasks = () => {
  return (
    <>
     <div class="flex flex-col space-y-4 p-4">
  <div class="flex space-x-4">
    <div class="w-1/4 bg-card p-4 rounded-lg shadow">
      <h2 class="text-lg font-bold text-primary">Upcoming Tasks <span class="text-muted">(5)</span></h2>
      <div class="space-y-2 mt-2">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Research</h3>
          <p class="text-sm text-muted">01</p>
          <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Math</span>
          <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded">Algebra</span>
          <div class="flex items-center mt-2">
            <span class="text-sm"></span>
            <div class="flex space-x-1 ml-auto">
              <span class="text-muted">4/04</span>
            </div>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Create a mosaic painting</h3>
          <p class="text-sm text-muted">02</p>
          <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded">Painting</span>
          <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Arts</span>
          <div class="flex items-center mt-2">
            <span class="text-sm"></span>
            <div class="flex space-x-1 ml-auto">
              <span class="text-muted">2/04</span>
            </div>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Group Meeting</h3>
          <p class="text-sm text-muted">03</p>
          <span class="bg-green-200 text-green-800 px-2 py-1 rounded">Project</span>
          <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">IT</span>
          <div class="flex items-center mt-2">
            <span class="text-sm"></span>
            <div class="flex space-x-1 ml-auto">
              <span class="text-muted">2/05</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/4 bg-card p-4 rounded-lg shadow">
      <h2 class="text-lg font-bold text-primary">To Do Tasks <span class="text-muted">(3)</span></h2>
      <div class="space-y-2 mt-2">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Write Notes</h3>
          <p class="text-sm text-muted">01</p>
          <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded">To Do</span>
          <div class="flex items-center mt-2">
            <span class="text-muted">1</span>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Revise Notes</h3>
          <p class="text-sm text-muted">01</p>
          <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded">To Do</span>
          <div class="flex items-center mt-2">
            <span class="text-muted">1</span>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Create calendar, chat and email app pages</h3>
          <p class="text-sm text-muted">02</p>
          <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded">Development</span>
          <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded">To Do</span>
          <div class="flex items-center mt-2">
            <span class="text-muted">1</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/4 bg-card p-4 rounded-lg shadow">
      <h2 class="text-lg font-bold text-primary">In Process <span class="text-muted">(2)</span></h2>
      <div class="space-y-2 mt-2">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">English Comprehension Assignment</h3>
          <p class="text-sm text-muted">03</p>
          <span class="bg-purple-200 text-purple-800 px-2 py-1 rounded">In Process</span>
          <div class="flex items-center mt-2">
            <span class="text-muted">1</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/4 bg-card p-4 rounded-lg shadow">
      <h2 class="text-lg font-bold text-primary">Done <span class="text-muted">(5)</span></h2>
      <div class="space-y-2 mt-2">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Venn Diagram Assignment</h3>
          <p class="text-sm text-muted">01</p>
          <span class="bg-green-200 text-green-800 px-2 py-1 rounded">Done</span>
          <div class="flex items-center mt-2">
            <span class="text-muted">1</span>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Science Prep</h3>
          <p class="text-sm text-muted">02</p>
          <span class="bg-green-200 text-green-800 px-2 py-1 rounded">Done</span>
          <div class="flex items-center mt-2">
            <span class="text-muted">1</span>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Reading Oliver Twist</h3>
          <p class="text-sm text-muted">03</p>
          <span class="bg-green-200 text-green-800 px-2 py-1 rounded">Done</span>
          <div class="flex items-center mt-2">
            <span class="text-muted">1</span>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">Math Exercise</h3>
          <p class="text-sm text-muted">04</p>
          <span class="bg-purple-200 text-purple-800 px-2 py-1 rounded">To Verify</span>
          <div class="flex items-center mt-2">
            <span class="text-muted">1</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-4">
    <button class="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded">+</button>
  </div>
</div>
    </>
  );
};

export default Tasks;
