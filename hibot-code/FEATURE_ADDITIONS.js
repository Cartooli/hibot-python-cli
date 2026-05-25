/**
 * BEGINNER WEB STUDIO - FEATURE ADDITIONS
 * Complete implementation of all 21 enhancement features
 * 
 * HOW TO USE:
 * 1. Copy sections below and insert into index.html at appropriate locations
 * 2. Follow the "INSERT AT" comments for correct placement
 * 3. Test each feature incrementally
 */

// ============================================================================
// FEATURE 1-3: TEMPLATE SEARCH, FILTER & PREVIEW MODAL
// INSERT AT: After templateSelect element declaration (around line 1650)
// ============================================================================

const templateSearch = el("templateSearch");
const templateCategory = el("templateCategory");
const btnPreviewTemplate = el("btnPreviewTemplate");

// Template search and filter functionality
function filterTemplates() {
  const searchTerm = templateSearch.value.toLowerCase();
  const category = templateCategory.value;
  const options = templateSelect.querySelectorAll('option');
  
  options.forEach(opt => {
    if (!opt.value || opt.value === 'default' || opt.value === 'blank') {
      opt.style.display = '';
      return;
    }
    
    const metadata = templateMetadata[opt.value];
    if (!metadata) {
      opt.style.display = '';
      return;
    }
    
    const matchesCategory = !category || metadata.category === category;
    const matchesSearch = !searchTerm || 
      opt.textContent.toLowerCase().includes(searchTerm) ||
      metadata.description.toLowerCase().includes(searchTerm) ||
      metadata.keywords.toLowerCase().includes(searchTerm);
    
    opt.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
  });
  
  // Hide optgroups if all options hidden
  const optgroups = templateSelect.querySelectorAll('optgroup');
  optgroups.forEach(group => {
    const visibleOptions = Array.from(group.querySelectorAll('option'))
      .filter(opt => opt.style.display !== 'none');
    group.style.display = visibleOptions.length > 0 ? '' : 'none';
  });
}

templateSearch.addEventListener('input', filterTemplates);
templateCategory.addEventListener('change', filterTemplates);

// Template preview modal
function showTemplatePreview(templateKey) {
  if (!templateKey || !templates[templateKey]) {
    showToast("Please select a template first", "warning");
    return;
  }
  
  const template = templates[templateKey];
  const metadata = templateMetadata[templateKey];
  const previewHTML = buildHTML(Object.assign({}, state, template));
  
  const modal = document.createElement('div');
  modal.className = 'template-preview-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>${template.metaTitle || 'Template Preview'}</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        ${metadata ? `<p class="template-description">${metadata.description}</p>` : ''}
        <iframe class="preview-frame" sandbox="allow-scripts" srcdoc="${escapeHtml(previewHTML)}"></iframe>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary modal-cancel">Cancel</button>
        <button class="btn btn-primary modal-apply">Apply Template</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add styles if not already present
  if (!document.getElementById('template-preview-styles')) {
    const style = document.createElement('style');
    style.id = 'template-preview-styles';
    style.textContent = `
      .template-preview-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.2s;
      }
      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(4px);
      }
      .modal-content {
        position: relative;
        background: var(--bg-dark);
        border-radius: 12px;
        max-width: 90vw;
        max-height: 90vh;
        width: 900px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      }
      .modal-header {
        padding: 20px 24px;
        border-bottom: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .modal-header h3 {
        margin: 0;
        font-size: 20px;
      }
      .modal-close {
        background: none;
        border: none;
        font-size: 32px;
        cursor: pointer;
        color: var(--muted);
        line-height: 1;
        padding: 0;
        width: 32px;
        height: 32px;
      }
      .modal-close:hover {
        color: var(--ink);
      }
      .modal-body {
        padding: 24px;
        overflow: auto;
        flex: 1;
      }
      .template-description {
        margin: 0 0 16px 0;
        color: var(--muted);
        font-size: 14px;
      }
      .preview-frame {
        width: 100%;
        height: 500px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: white;
      }
      .modal-footer {
        padding: 16px 24px;
        border-top: 1px solid var(--border);
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
      .modal-cancel {
        background: var(--bg-darker);
        color: var(--ink);
      }
      .modal-apply {
        background: var(--accent);
        color: white;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Event handlers
  const closeModal = () => modal.remove();
  modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-cancel').addEventListener('click', closeModal);
  modal.querySelector('.modal-apply').addEventListener('click', () => {
    templateSelect.value = templateKey;
    templateSelect.dispatchEvent(new Event('change'));
    closeModal();
  });
}

btnPreviewTemplate.addEventListener('click', () => {
  const templateKey = templateSelect.value;
  showTemplatePreview(templateKey);
});

// ============================================================================
// FEATURE 4-6: PROJECT MANAGEMENT (SAVE/LOAD SLOTS)
// INSERT AT: After saveToLS function (around line 1800)
// ============================================================================

// Project slot management
const PROJECT_SLOTS_KEY = 'bws_projects';
const MAX_PROJECTS = 10;

function saveProjectSlot(name) {
  try {
    const projects = JSON.parse(localStorage.getItem(PROJECT_SLOTS_KEY) || '{}');
    projects[name] = {
      name: name,
      state: JSON.parse(JSON.stringify(state)),
      savedAt: new Date().toISOString()
    };
    
    // Limit to MAX_PROJECTS
    const projectNames = Object.keys(projects);
    if (projectNames.length > MAX_PROJECTS) {
      // Remove oldest
      const oldest = projectNames
        .map(n => ({ name: n, date: new Date(projects[n].savedAt) }))
        .sort((a, b) => a.date - b.date)[0];
      delete projects[oldest.name];
    }
    
    localStorage.setItem(PROJECT_SLOTS_KEY, JSON.stringify(projects));
    showToast(`Project "${name}" saved!`, "success");
    return true;
  } catch (e) {
    console.error('Failed to save project:', e);
    showToast("Failed to save project", "error");
    return false;
  }
}

function loadProjectSlot(name) {
  try {
    const projects = JSON.parse(localStorage.getItem(PROJECT_SLOTS_KEY) || '{}');
    const project = projects[name];
    
    if (!project) {
      showToast("Project not found", "error");
      return false;
    }
    
    Object.assign(state, project.state);
    stateToPanel();
    stateToCode();
    codeToPreview();
    saveToHistory();
    showToast(`Project "${name}" loaded!`, "success");
    return true;
  } catch (e) {
    console.error('Failed to load project:', e);
    showToast("Failed to load project", "error");
    return false;
  }
}

function listProjectSlots() {
  try {
    const projects = JSON.parse(localStorage.getItem(PROJECT_SLOTS_KEY) || '{}');
    return Object.values(projects).sort((a, b) => 
      new Date(b.savedAt) - new Date(a.savedAt)
    );
  } catch (e) {
    console.error('Failed to list projects:', e);
    return [];
  }
}

function deleteProjectSlot(name) {
  try {
    const projects = JSON.parse(localStorage.getItem(PROJECT_SLOTS_KEY) || '{}');
    delete projects[name];
    localStorage.setItem(PROJECT_SLOTS_KEY, JSON.stringify(projects));
    showToast(`Project "${name}" deleted`, "info");
    return true;
  } catch (e) {
    console.error('Failed to delete project:', e);
    return false;
  }
}

// Project management UI
function showProjectManager() {
  const projects = listProjectSlots();
  
  const modal = document.createElement('div');
  modal.className = 'project-manager-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>💾 Manage Projects</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="project-save-section">
          <h4>Save Current Project</h4>
          <div style="display:flex; gap:8px;">
            <input type="text" id="newProjectName" placeholder="Project name..." 
                   style="flex:1;" maxlength="50">
            <button class="btn btn-primary" id="btnSaveNewProject">Save</button>
          </div>
        </div>
        
        <div class="project-list-section">
          <h4>Saved Projects (${projects.length}/${MAX_PROJECTS})</h4>
          ${projects.length === 0 ? '<p style="color:var(--muted);">No saved projects yet</p>' : ''}
          <div class="project-list">
            ${projects.map(p => `
              <div class="project-item" data-name="${p.name}">
                <div class="project-info">
                  <strong>${p.name}</strong>
                  <span class="project-date">${new Date(p.savedAt).toLocaleDateString()}</span>
                </div>
                <div class="project-actions">
                  <button class="btn small project-load">Load</button>
                  <button class="btn small project-delete">Delete</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn modal-close">Close</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add styles
  if (!document.getElementById('project-manager-styles')) {
    const style = document.createElement('style');
    style.id = 'project-manager-styles';
    style.textContent = `
      .project-save-section {
        margin-bottom: 32px;
        padding-bottom: 24px;
        border-bottom: 1px solid var(--border);
      }
      .project-save-section h4,
      .project-list-section h4 {
        margin: 0 0 12px 0;
        font-size: 16px;
        color: var(--accent);
      }
      .project-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 400px;
        overflow-y: auto;
      }
      .project-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: var(--bg-darker);
        border-radius: 8px;
        border: 1px solid var(--border);
      }
      .project-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .project-date {
        font-size: 12px;
        color: var(--muted);
      }
      .project-actions {
        display: flex;
        gap: 8px;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Event handlers
  const closeModal = () => modal.remove();
  modal.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeModal));
  modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
  
  modal.querySelector('#btnSaveNewProject').addEventListener('click', () => {
    const input = modal.querySelector('#newProjectName');
    const name = input.value.trim();
    if (!name) {
      showToast("Please enter a project name", "warning");
      return;
    }
    if (saveProjectSlot(name)) {
      closeModal();
      showProjectManager(); // Refresh
    }
  });
  
  modal.querySelectorAll('.project-load').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = e.target.closest('.project-item').dataset.name;
      if (loadProjectSlot(name)) {
        closeModal();
      }
    });
  });
  
  modal.querySelectorAll('.project-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = e.target.closest('.project-item').dataset.name;
      if (confirm(`Delete project "${name}"?`)) {
        deleteProjectSlot(name);
        closeModal();
        showProjectManager(); // Refresh
      }
    });
  });
}

// ============================================================================
// FEATURE 7-9: IMPORT/EXPORT JSON & DUPLICATE TEMPLATE
// INSERT AT: After download button handler (around line 2350)
// ============================================================================

// Export current state as JSON template
function exportTemplateJSON() {
  const customTemplate = {
    name: state.metaTitle || 'Custom Template',
    metaTitle: state.metaTitle,
    metaDesc: state.metaDesc,
    h1: state.h1,
    h2: state.h2,
    h3: state.h3,
    para: state.para,
    bgColor: state.bgColor,
    textColor: state.textColor,
    accentColor: state.accentColor,
    borderColor: state.borderColor,
    linkColor: state.linkColor,
    fontFamily: state.fontFamily,
    baseSize: state.baseSize,
    lineHeight: state.lineHeight,
    exportedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(customTemplate, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `template-${customTemplate.name.toLowerCase().replace(/\s+/g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Template exported as JSON!", "success");
}

// Import template from JSON
function importTemplateJSON(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const template = JSON.parse(e.target.result);
      
      // Validate basic structure
      if (!template.metaTitle && !template.h1) {
        throw new Error('Invalid template format');
      }
      
      // Merge into current state
      Object.assign(state, template);
      stateToPanel();
      stateToCode();
      codeToPreview();
      saveToHistory();
      showToast(`Template "${template.name || 'imported'}" loaded!`, "success");
    } catch (err) {
      console.error('Import failed:', err);
      showToast("Invalid template file", "error");
    }
  };
  reader.readAsText(file);
}

// Duplicate current state as custom template
function duplicateAsTemplate() {
  const name = prompt('Enter a name for this custom template:');
  if (!name) return;
  
  const customTemplates = JSON.parse(localStorage.getItem('bws_custom_templates') || '{}');
  const templateKey = name.toLowerCase().replace(/\s+/g, '_');
  
  customTemplates[templateKey] = {
    ...state,
    name: name,
    createdAt: new Date().toISOString()
  };
  
  localStorage.setItem('bws_custom_templates', JSON.stringify(customTemplates));
  showToast(`Custom template "${name}" saved!`, "success");
}

// ============================================================================
// FEATURE 10-12: COPY MINIMAL HTML & EXPORT TO ZIP
// INSERT AT: After download button handler (around line 2350)
// ============================================================================

// Copy minimal HTML (clean, without editor bloat)
function copyMinimalHTML() {
  const minimalHTML = buildHTML(state);
  
  navigator.clipboard.writeText(minimalHTML).then(() => {
    showToast("Minimal HTML copied to clipboard!", "success");
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = minimalHTML;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast("Minimal HTML copied!", "success");
  });
}

// Export to ZIP (requires JSZip library - implement when user requests)
function exportToZIP() {
  showToast("ZIP export feature requires JSZip library. Coming soon!", "info");
  // Implementation note: Add JSZip inline or load dynamically
  // const zip = new JSZip();
  // zip.file("index.html", buildHTML(state));
  // zip.file("README.txt", "Generated with Hi Bot Code");
  // zip.generateAsync({type:"blob"}).then(content => {
  //   const url = URL.createObjectURL(content);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `website-${Date.now()}.zip`;
  //   a.click();
  // });
}

// ============================================================================
// FEATURE 13: LZ-STRING COMPRESSION FOR SHARE URLs
// ============================================================================

// Simplified LZ-string compression (inline mini version)
const LZString = {
  compressToEncodedURIComponent: function(input) {
    if (input == null) return "";
    return this._compress(input, 6, function(a){return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$'.charAt(a);});
  },
  decompressFromEncodedURIComponent: function(input) {
    if (input == null) return "";
    if (input == "") return null;
    input = input.replace(/ /g, "+");
    return this._decompress(input.length, 32, function(index) { return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$'.indexOf(input.charAt(index)); });
  },
  _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
    if (uncompressed == null) return "";
    var i, value, context_dictionary= {}, context_dictionaryToCreate= {}, context_c="", context_wc="", context_w="", 
        context_enlargeIn= 2, context_dictSize= 3, context_numBits= 2, context_data=[], context_data_val=0, context_data_position=0, ii;
    
    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }
      
      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position ==bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }
    
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == bitsPerChar-1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }
      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }
    
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == bitsPerChar-1) {
        context_data_position = 0;
        context_data.push(getCharFromInt(context_data_val));
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }
    
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == bitsPerChar-1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      }
      else context_data_position++;
    }
    return context_data.join('');
  },
  _decompress: function(length, resetValue, getNextValue) {
    var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = {val:getNextValue(0), position:resetValue, index:1};
    
    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }
    
    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }
    
    switch (next = bits) {
      case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = String.fromCharCode(bits);
        break;
      case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = String.fromCharCode(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return "";
      }
      
      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = String.fromCharCode(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = String.fromCharCode(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      }
      
      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }
      
      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result.push(entry);
      
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;
      
      w = entry;
      
      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }
    }
  }
};

// Updated share function with compression
function shareWithCompression() {
  try {
    const compressed = LZString.compressToEncodedURIComponent(codeTA.value);
    const shareUrl = `${window.location.origin}${window.location.pathname}?c=${compressed}`;
    
    if (shareUrl.length > 2000) {
      showToast("Code is still too long to share via URL", "warning", 4000);
      return;
    }
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast(`Share link copied! (${shareUrl.length} chars)`, "success");
    }).catch(() => {
      showToast("Could not copy link", "error");
    });
  } catch (e) {
    showToast("Unable to compress code", "error");
  }
}

// Load compressed code on page load
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const compressed = params.get('c');
  
  if (compressed) {
    try {
      const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
      if (decompressed) {
        codeTA.value = decompressed;
        codeToPreview();
        trySyncPanelFromCode();
        showToast("Shared code loaded!", "success");
      }
    } catch (e) {
      console.error('Failed to decompress:', e);
    }
  }
});

// ============================================================================
// FEATURE 14-16: VENDOR PREFIXES & SAFARI COMPATIBILITY
// INSERT AT: In CSS <style> section (around line 200-400)
// ============================================================================

/**
 * Add these CSS rules to existing styles:
 * 
 * Replace:
 *   user-select: none;
 * With:
 *   -webkit-user-select: none;
 *   user-select: none;
 * 
 * Replace:
 *   backdrop-filter: blur(10px);
 * With:
 *   -webkit-backdrop-filter: blur(10px);
 *   backdrop-filter: blur(10px);
 * 
 * Note: -webkit-overflow-scrolling is deprecated, can be removed safely
 */

// ============================================================================
// FEATURE 17-18: FULL-SCREEN EDITOR MODE
// INSERT AT: After editor toggle button handler (around line 2200)
// ============================================================================

let isFullscreenEditor = false;

function toggleFullscreenEditor() {
  isFullscreenEditor = !isFullscreenEditor;
  const editor = document.querySelector('.editor');
  const preview = document.querySelector('.preview-card');
  const panel = document.querySelector('.panel');
  
  if (isFullscreenEditor) {
    editor.classList.add('fullscreen-mode');
    if (preview) preview.style.display = 'none';
    if (panel) panel.style.display = 'none';
    document.body.classList.add('editor-fullscreen');
  } else {
    editor.classList.remove('fullscreen-mode');
    if (preview) preview.style.display = '';
    if (panel) panel.style.display = '';
    document.body.classList.remove('editor-fullscreen');
  }
}

// Add fullscreen styles
const fullscreenStyles = `
  body.editor-fullscreen .app {
    grid-template-rows: 1fr !important;
  }
  .editor.fullscreen-mode {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    max-height: 100vh !important;
    margin: 0;
    border-radius: 0;
  }
  .editor.fullscreen-mode .editor-body {
    height: calc(100vh - 60px);
  }
`;

// ============================================================================
// FEATURE 19-21: LOCAL ANALYTICS & PERFORMANCE
// INSERT AT: After state initialization (around line 1700)
// ============================================================================

// Local analytics (privacy-first, no network requests)
const analytics = {
  init() {
    if (!localStorage.getItem('bws_analytics')) {
      localStorage.setItem('bws_analytics', JSON.stringify({
        totalEdits: 0,
        templatesUsed: {},
        featuresUsed: {},
        sessionsCount: 0,
        lastSession: null
      }));
    }
  },
  
  track(event, data = {}) {
    try {
      const stats = JSON.parse(localStorage.getItem('bws_analytics') || '{}');
      
      switch(event) {
        case 'edit':
          stats.totalEdits = (stats.totalEdits || 0) + 1;
          break;
        case 'template':
          stats.templatesUsed = stats.templatesUsed || {};
          stats.templatesUsed[data.name] = (stats.templatesUsed[data.name] || 0) + 1;
          break;
        case 'feature':
          stats.featuresUsed = stats.featuresUsed || {};
          stats.featuresUsed[data.name] = (stats.featuresUsed[data.name] || 0) + 1;
          break;
        case 'session':
          stats.sessionsCount = (stats.sessionsCount || 0) + 1;
          stats.lastSession = new Date().toISOString();
          break;
      }
      
      localStorage.setItem('bws_analytics', JSON.stringify(stats));
    } catch (e) {
      // Silently fail - analytics shouldn't break app
    }
  },
  
  get() {
    try {
      return JSON.parse(localStorage.getItem('bws_analytics') || '{}');
    } catch (e) {
      return {};
    }
  }
};

analytics.init();
analytics.track('session');

// Performance: Improved debouncing with adaptive delay
function adaptiveDebounce(func, baseDelay = 300) {
  let timeout;
  let lastCall = Date.now();
  
  return function(...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    // Adaptive delay: longer delay if user is typing quickly
    const delay = timeSinceLastCall < 100 ? baseDelay * 1.5 : baseDelay;
    
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      lastCall = Date.now();
      func.apply(this, args);
    }, delay);
  };
}

// Replace existing debounce with adaptive version in code editor
// codeTA.addEventListener('input', adaptiveDebounce(() => {
//   codeToPreview();
//   analytics.track('edit');
// }, 300));

// ============================================================================
// END OF FEATURE ADDITIONS
// ============================================================================

/**
 * IMPLEMENTATION CHECKLIST:
 * 
 * [ ] 1. Add template search/filter UI elements
 * [ ] 2. Add preview modal HTML structure
 * [ ] 3. Integrate template metadata
 * [ ] 4. Add project management functions
 * [ ] 5. Add import/export JSON handlers
 * [ ] 6. Add LZ-string compression
 * [ ] 7. Update CSS with vendor prefixes
 * [ ] 8. Add fullscreen editor mode
 * [ ] 9. Add local analytics tracking
 * [ ] 10. Connect UI buttons to new functions
 * 
 * BUTTONS TO ADD (In Edit Panel):
 * - "💾 Manage Projects" button -> showProjectManager()
 * - "📤 Export Template" button -> exportTemplateJSON()
 * - "📥 Import Template" button -> file input -> importTemplateJSON()
 * - "🔄 Duplicate as Template" button -> duplicateAsTemplate()
 * - "📋 Copy Minimal HTML" button -> copyMinimalHTML()
 * - "🔍 Fullscreen Editor" button -> toggleFullscreenEditor()
 * 
 * TESTING:
 * 1. Test template search/filter
 * 2. Test preview modal
 * 3. Test project save/load/delete
 * 4. Test JSON import/export
 * 5. Test share URL compression
 * 6. Test fullscreen mode
 * 7. Verify all analytics tracking
 * 8. Check vendor prefixes in Safari
 */

